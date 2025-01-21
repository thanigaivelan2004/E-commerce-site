import React from 'react'
import { useState,useContext} from 'react';

import {assests} from '../assets/assests'
import { Link,NavLink } from 'react-router-dom'
import { Shopcontext } from '../context/shopcontext';


export const Navbar = () => {

  const [visible,setVisible] =useState(false);

  const {setShowSearch,getcartCount,navigate,token,setToken,setCartItems}=useContext(Shopcontext);
  const logout=() => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('')
    setCartItems({})
   
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
    < Link to='/'> <img src={assests.Logo} className='w-36' alt='logo' /></Link>
    <ul className='hidden sm:flex gap-5 text-sm text-grey-700'>
      <NavLink to='/' className='flex flex-col items-center gap-1'>
        <p>Home</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      <NavLink to='/Collection' className='flex flex-col items-center gap-1'>
        <p>Collection</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      <NavLink to='/About' className='flex flex-col items-center gap-1'>
        <p>About</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>
      <NavLink to='Contact' className='flex flex-col items-center gap-1'>
        <p>Contact</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
      </NavLink>

    </ul>

    <div className='flex items-center gap-6'>
      <img  onClick={() =>setShowSearch(true)} src={assests.img4} className='w-5 cursor-pointer' alt='search'/>
      {/*Dropdown Menu*/}
      {token &&
      <div className='group relative'>
        <img onClick={()=>token ? null :navigate('/login')} className='w-5 cursor-pointer' src={assests.img5} alt='profile'/>
        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
        <p className='cursor-pointer hover:text-black'>My profile</p>
        <p onClick={()=>navigate('/Orders')} className='cursor-pointer hover:text-black'>Orders</p>
        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
        </div>
        </div>
        </div>}
        <Link to='/cart' className='relative'>
        <img src={assests.img6} className='w-5 min-w-5' alt=''/>
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getcartCount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assests.img7} className='w-5 cursor-pointer sm:hidden' alt=''/>

        </div>
        {/*sidebarmenu for smaller screen*/}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={()=>setVisible(false)}className='flex item-center gap-4 p-3'>
            <img className='h-4 rotate-90 ' src={assests.img8} alt='back7'/>
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/Collection'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/About'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/Contact'>CONTACT</NavLink>
          </div>


        </div>
        </div>
    )
}


export default Navbar