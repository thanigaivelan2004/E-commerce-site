import React from 'react'
import { assests } from '../assets/assests'

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm ms:text-base text-gray-700">
        <div>
            <img src={assests.img22} className="w-12 m-auto mb-5" alt=""/>
            <p className="font-semibold">Easy Exchange Policy</p>
            <p className="text-gray-400">We Offer Free Exchange Policy</p>
        </div>

        <div>
            <img src={assests.img23} className="w-12 m-auto mb-5" alt=""/>
            <p className="font-semibold">7 Days Return Policy</p>
            <p className="text-gray-400">We provide 7 Days Return Policy</p>
        </div>

        <div>
            <img src={assests.img24} className="w-12 m-auto mb-5" alt=""/>
            <p className="font-semibold">Best Customer Support</p>
            <p className="text-gray-400">We Provide 24/7 Customer Support</p>
        </div>


    </div>
  )
}

export default OurPolicy