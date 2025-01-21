import React, { useContext, useEffect } from 'react';
import { Shopcontext } from '../context/shopcontext';
import Title from '../components/Title';
import axios from 'axios';
import { useState } from 'react';


export const Orders = () => {
  const { backendUrl,token, currency } = useContext(Shopcontext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async() =>{
    try {
      if(!token)
      {
        return null;
      }

      
        const response = await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
        if(response.data.success)
        {
          let allOrdersItem =[]
          response.data.orders.map((order)=>{
            order.items.map((item)=>{
                item['status']=order.status
                item['payment']=order.payment
                item['paymentMethod']=order.paymentMethod
                item['date']=order.date
                allOrdersItem.push(item)
              })
            })
            setorderData(allOrdersItem.reverse())
          
        }
        
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm md:w-3/4">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency} {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size:{item.size}</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-2">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:w-1/4">
  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
  <p className="text-sm md:text-base text-center">{item.status}</p>
</div>

            <div>
              <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
