import React, { useContext, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assests } from '../assets/assests';
import { Shopcontext } from '../context/shopcontext';
import { toast } from 'react-toastify';



const PAYMENT_METHODS = {
  COD: 'cod',
  STRIPE: 'stripe',
  RAZORPAY: 'razorpay',
};

const PlaceOrder = () => {
  const [method, setMethod] = useState(PAYMENT_METHODS.COD);

  const { navigate, backendUrl, token, cartitems, setCartItems, getCartAmount, delivery_fee, products } =
    useContext(Shopcontext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const initPay = (order) => {
    const razorpaykeyId = 'rzp_test_qFF30coCZs5uJQ';
  
    if (!razorpaykeyId) {
      console.error("Razorpay key is missing.");
      return;
    }
  
    // Check if Razorpay script is already loaded
    if (!window.Razorpay) {
      console.error("Razorpay is not loaded. Loading dynamically...");
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log("Razorpay script loaded successfully.");
        // Retry initializing Razorpay after script is loaded
        initPay(order);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script.");
      };
      document.body.appendChild(script);
      return;
    }
  
    // Proceed with Razorpay payment setup
    const options = {
      key: razorpaykeyId,
      amount: order.amount * 100,
      currency: "INR",
      name: "Ecommerce",
      description: "Payment",
      order_id: order.id,
      receipt: order.id,
      handler: async (response) => {
        console.log("Payment successful:", response);
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.quantity = cartitems[items][item];
              itemInfo.size = item;
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      let response;
      switch (method) {
        case PAYMENT_METHODS.COD:
          response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/Orders');
          } else {
            toast.error(response.data.message || 'Order placement failed');
          }
          break;
        case PAYMENT_METHODS.STRIPE:
          const reponseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, { headers: { token } });
          if (reponseStripe.data.success) {
            const {session_url} = reponseStripe.data;
            window.location.replace(session_url);
          }else{
            toast.error(reponseStripe.data.message || 'Order placement failed');
          }
          break;

        case PAYMENT_METHODS.RAZORPAY:
          const reponseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } });
          if (reponseRazorpay.data.success) {
            initPay(reponseRazorpay.data.order);
          }else{
            toast.error(reponseRazorpay.data.message || 'Order placement failed');
          }
          break;

        default:
          toast.error('Unsupported payment method selected');
          break;
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An error occurred while placing the order. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" />
        </div>
        <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipCode" value={formData.zipCode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="ZipCode" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
      </div>
      <div className="mt-8">
        <CartTotal />
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod(PAYMENT_METHODS.STRIPE)} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === PAYMENT_METHODS.STRIPE ? 'bg-green-400' : ''}`}></p>
              <img className="h-8 mx-4" src={assests.img29} alt="" />
            </div>
            <div onClick={() => setMethod(PAYMENT_METHODS.RAZORPAY)} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === PAYMENT_METHODS.RAZORPAY ? 'bg-green-400' : ''}`}></p>
              <img className="h-8 mx-4" src={assests.img30} alt="" />
            </div>
            <div onClick={() => setMethod(PAYMENT_METHODS.COD)} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === PAYMENT_METHODS.COD ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
