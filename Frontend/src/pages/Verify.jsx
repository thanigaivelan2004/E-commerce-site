import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Shopcontext } from '../context/shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const {navigate,token,setCartItems,backendUrl}=useContext(Shopcontext)
    const [searchParams,setSearchParams]=useSearchParams()

    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')



    const verifyPayment = async() =>{
        try {
            if(!token)
            {
                return null
            }
            else{
                const response = await axios.post(`${backendUrl}/api/order/verifyStripe`,{success,orderId}, { headers: { token } });
                if(response.data.success)
                {
                    setCartItems({})
                    navigate('/Orders')
                }
                else{
                    navigate('/Cart')
                }
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }

    }

    useEffect(() => {
        verifyPayment(success)},[token])
    
  return (
    <div>

    </div>
  )
}

export default Verify