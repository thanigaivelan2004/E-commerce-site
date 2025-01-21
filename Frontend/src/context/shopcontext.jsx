import { createContext, useEffect } from "react";

import { useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import { get } from "mongoose";

export const Shopcontext = createContext();

const Shopcontextprovider = (props) => {
    const currency = '$';
    const delivery_fee = 5;
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const [cartitems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken]=useState('')
    const navigate=useNavigate();

    const addToCart = async (itemId, size) => {


        if(!size)
        {
            toast.error('Select Product size');
            return;
        }
        let cartData = structuredClone(cartitems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if(token)
        {
            try {
                const response= await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
                if(response.data.success)
                {
                    toast.success(response.data.message)
                }else{
                    toast.error(response.data.message)
                }
                
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
    };
}

    const getcartCount = () => {
        let totalCount = 0;
        for (const items in cartitems) {
          for (const size in cartitems[items]) {
            if (cartitems[items][size] > 0) {
              totalCount += cartitems[items][size];
            }
          }
        }
        return totalCount;
      }

      const updateQuantity=async(itemId,size,quantity)=> {

        let cartData = structuredClone(cartitems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
                
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

      }

      const getCartAmount=()=>{
        let totalAmount = 0;
        for(const items in cartitems)
        {
            let itemInfo=products.find((product)=>product._id === items);
            for(const item in cartitems[items])
            {
                try{
                    if(cartitems[items][item] >0)
                    {
                        totalAmount+=itemInfo.price* cartitems[items][item]
                    }
                }catch(error)
                {

                }
            }
        }
        return totalAmount;
      }

      const getProductsData= async()=>{
        try {

            const response =await  axios.get(backendUrl+'/api/product/list')
            if(response.data.success)
            {
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            
            console.log(error)
            toast.error(error.message)

            
        }
      }

      const updateCart=async(req,res)=>{
        try {
            const {userId,itemId,size,quantity} = req.body;
    
            const userData = await userModel.findById(userId);
    
            let cartData=await userData.cartData;
    
            cartData[itemId][size]=quantity;
    
            await userModel.findByIdAndUpdate(userId,{cartData});
            res.json({success:true,message:"Cart updated successfully"});
            
        } catch (error) {
            
        }
      }

      const getUsercart=async(token)=>{
        try {
            const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
            if(response.data.success)
            {
                setCartItems(response.data.cartData)
            }
            
        }catch(error)   {
            console.log(error)
            toast.error(error.message)
        }



      }

      useEffect(()=>{
        getProductsData()

      },[])

      useEffect(()=>{
        if(!token && localStorage.getItem('token'))
        {
            setToken(localStorage.getItem('token'));
            getUsercart(localStorage.getItem('token'))
            getUsercart()
        }
      })
      


  

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartitems,
        addToCart,
        getcartCount,
        updateQuantity,
        getCartAmount,
        getProductsData,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems

    };

    return (
        <Shopcontext.Provider value={value}>
            {props.children}
        </Shopcontext.Provider>
    );
};

export default Shopcontextprovider;
