import React from 'react'
import { assests } from '../assets/assests'

const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                <img src={assests.Logo} className="mb-5  w-32" alt=""/>
                <p className='w-full md:w-2/3  text-gray-700 '>
                Sign up today and get special offers, discounts, and updates directly to your inbox! 
                dates directly to your inbox!
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-700">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Ploicy</li>

                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-700">
                    <li>+91 7604907947</li>
                    <li>thanigaivelan2004@gmail.com</li>
                </ul>
            </div>

        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2024@ Thani.com - All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer