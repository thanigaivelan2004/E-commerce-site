import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import Razorpay from 'razorpay';

//global variables
const currency = 'usd'
const currency2 = 'INR'
const delivery_fee = 10

//gateway initialization

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


//Placing orders using cod
const placeOrder = async (req, res) => {
    try {
        const{userId,items,amount,address} = req.body;

        const orderData ={
            userId,
            items,
            address,  
            amount,
            paymentMethod:"cod",
            payment:false,              
            date:Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed Successfully"});

        
    } catch (error) {
        console.log("Error in placeOrder",error);
        res.json({success:false,message:error.message});
        
    }
}

//Placing orders using Stripe

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        // Validate origin or use a fallback URL
        const baseUrl = origin || process.env.BASE_URL || "https://your-default-url.com";

        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        // Prepare order data
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "stripe",
            payment: false,
            date: Date.now(),
        };

        // Save order to database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Construct line items
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Ensure the price is in cents
            },
            quantity: item.quantity,
        }));

        // Add delivery fee
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Fee",
                },
                unit_amount: delivery_fee * 100, // Ensure the fee is in cents
            },
            quantity: 1,
        });

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${baseUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${baseUrl}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log("Error in placeOrderStripe", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify Stripe payment
// Verify Stripe payment
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if (success === "true") {
            // Update order and user
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            // Send success response
            return res.json({ success: true, message: "Payment successful!" });
        } else {
            // Delete the order on payment failure
            await orderModel.findByIdAndDelete(orderId);

            // Send failure response
            return res.json({ success: false, message: "Payment failed!" });
        }
    } catch (error) {
        console.error("Error in verifyStripe:", error);
        // Handle errors
        return res.status(500).json({ success: false, message: error.message });
    }
};



//Placing orders using Razorpay
const placeOrderRazorPay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        };

        // Save order to database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

       
        const options = {
            amount: amount*100, // Amount in smallest currency unit
            currency: currency2*100,
            receipt: newOrder._id.toString()
            
        };

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log("Error in Razorpay",error);
                return res.status(500).json({ success: false, message: error.message });
            }
            res.json({ success: true,order});

        });
    } catch (error) {
        console.log("Error in placeOrderRazorPay", error);
        res.status(500).json({ success: false, message: error.message });
    }

}

const verifyRazorPay = async (req, res) => {
    
    try {
        const { userId, razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate (userId,{cartData:{}})
            res.json({success:true,message:"Payment Successful"});
        }
        else
        {
            res.json({success:false,message:"Payment Failed"});
        }
    } catch (error) {
        console.log("Error in verifyRazorPay",error);
        res.json({success:false,message:error.message});
        
    }
}



//All orders data for admin

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,orders});
        
    } catch (error) {
        console.log("Error in allOrders",error);
        res.json({success:false,message:error.message});
        
    }
    
}

//user orders data
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId}).sort({date:-1});
        res.json({success:true,orders});
        
    } catch (error) {
        console.log("Error in userOrders",error);
        res.json({success:false,message:error.message});
        
    }
    
}

//update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const {orderId,status} = req.body;
        await orderModel .findByIdAndUpdate(orderId,{status});
        res.json({success:true,message:"Status Updated Successfully"});
    } catch (error) {
        console.log("Error in updateStatus",error);
        res.json({success:false,message:error.message});
        
    }

    
}

export {verifyRazorPay,verifyStripe,placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus}