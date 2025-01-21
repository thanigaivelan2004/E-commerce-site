import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js"

// function for add product

const addProduct =async (req,res)=>
{
    try {
        const {name,description,price,category,subCategory,sizes,bestseller} = req.body
        
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]

        const image3=req.files.image3 && req.files.image3[0]

        const image4=req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=> item!== undefined)

        let imagesUrl=await Promise.all(
            images.map(async (item) =>{

                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url

            })
        )

        console.log(imagesUrl)


        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller:bestseller==="true" ? true : false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }

        const product=new productModel(productData);
        await product.save();

        res.json({success:true,message:"Product Added"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}
//function for listProduct

const listProducts =async (req,res)=>
    {
        try {

            const products = await productModel.find({});
            res.json({success:true,products})
            


        } catch (error) {

            console.log(error)
            res.json({success:false,message:error.message})
            
        }
        
    }

    //function for removeProduct

    const removeProduct = async (req, res) => {
        try {
            // Deleting the product by its ID from the request body
            const product = await productModel.findByIdAndDelete(req.body.id);
    
            // Check if product is found and deleted
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
    
            // Send success response if the product is deleted successfully
            res.json({ success: true, message: 'Product removed successfully' });
    
        } catch (error) {
            console.log(error);  // Log the error for debugging
            res.status(500).json({ success: false, message: error.message || 'Server Error' });
        }
    };
    

//function for single product info

const singleProduct =async (req,res)=>
    {
        try {
            const {productId}=req.body
            const product = await productModel.findById(productId)
            res.json({ success: true,product})
        } catch (error) {


            console.log(error);  // Log the error for debugging
            res.status(500).json({ success: false, message: error.message || 'Server Error' });
            
        }
        
    }

export {listProducts,addProduct,removeProduct,singleProduct}