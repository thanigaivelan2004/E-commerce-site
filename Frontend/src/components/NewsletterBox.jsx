import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-3xl font-medium text-gray-900'>
            Subscribe now & get 20% off
        </p>
        <p className='text-gray-300 mt-3'>
        Subscribe to our newsletter and get exclusive offers straight to your inbox!  
        </p>
        <form onSubmit={onSubmitHandler}className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:slex-1 outline-none' type="email" placeholder="Enter your email here" required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>

    </div>
  )
}

export default NewsletterBox