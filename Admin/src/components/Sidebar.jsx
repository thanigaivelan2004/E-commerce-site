import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px] ">

        <NavLink className='flex-items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'to="/Add">
        <img className='w-5 h-5'src={assets.addicon} alt=""/>
        <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink className='flex-items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'to="/List">
        <img className='w-5 h-5'src={assets.order} alt=""/>
        <p className="hidden md:block">ListItems</p>
        </NavLink>

        <NavLink className='flex-items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'to="/Orders">
        <img className='w-5 h-5'src={assets.order} alt=""/>
        <p className="hidden md:block">Orders</p>
        </NavLink>
        </div>


    </div>
  )
}

export default Sidebar