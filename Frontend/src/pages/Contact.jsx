import React from 'react'
import Title from '../components/Title'
import { assests } from '../assets/assests'
import NewsletterBox from '../components/NewsletterBox'

export const Contact = () => {
  return (
    <div>

      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assests.img32} alt=""/>
        <div className="flex flex-col justify-center items-start gap-6">
        <p className="font-semibold text-xl text-gray-600">Our store</p>
        <p className='text-gray-500'>2/15,Nallampalayam<br></br>Trichengode<br></br>Namakkal</p>
        <p className='text-gray-500'>Tel (423) 764-877 <br></br>Email:thani@shop.com</p>
        <p className='font-semibold text-xl text-gray-600'>Careers at Thani</p>
        <p className='text-gray-500'>Learn more about our teams and job openings.</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        

        </div>

      </div>

      <NewsletterBox/>
    </div>
  )
}
