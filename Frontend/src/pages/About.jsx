import React from 'react'
import Title from '../components/Title'
import { assests } from '../assets/assests'
import NewsletterBox from '../components/NewsletterBox'


export const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'About'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assests.img31} alt=""/>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>Discover Trendy and Affordable Dresses
        Explore a wide selection of stylish dresses for every occasion. From casual wear to elegant evening gowns, our collection is crafted to suit your taste, budget, and unique style preferences.</p>
        <p>Unmatched Quality and Comfort
        Our dresses are made with premium fabrics to ensure a perfect blend of comfort and durability. Whether it's a summer dress or a formal outfit, we guarantee top-notch quality that feels as good as it looks.</p>
        <b class="text-gray-800">Our Mission</b>
        <p>Our mission is to empower individuals with fashion that inspires confidence and celebrates uniqueness. We are dedicated to offering high-quality, affordable dresses for every occasion while prioritizing comfort and style. With every purchase, we strive to make fashion accessible and enjoyable for all.</p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={'Why'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At our store, quality is our top priority. Each dress undergoes rigorous quality checks to ensure it meets our high standards for fabric, stitching, and design. We are committed to delivering products that combine durability, comfort, and style, ensuring your satisfaction with every purchase.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We prioritize your convenience by offering a seamless shopping experience. From easy-to-navigate website features to fast and reliable shipping, we ensure that your shopping journey is as smooth as possible. With hassle-free returns and multiple payment options, shopping with us is always quick and stress-free.</p>
        </div>


        <div className='border px-10 md:px-16 py-8 sm:py-20 flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>We are committed to providing outstanding customer service every step of the way. Our dedicated support team is always available to assist you with any inquiries, ensuring a personalized and smooth shopping experience. We value your satisfaction and go the extra mile to ensure you feel heard and cared for at all times.</p>
        </div>
      </div>

      <NewsletterBox/>




    </div>
  )
}
