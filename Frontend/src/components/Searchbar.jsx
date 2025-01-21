import React, { useEffect } from 'react'
import { Shopcontext } from '../context/shopcontext'
import { assests } from '../assets/assests';
import { useState,useContext } from 'react';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {



    const {search,setSearch,showSearch,setShowSearch} =useContext(Shopcontext);
    const[visible,setVisible] =useState(false)
    const location=useLocation();

    

    useEffect(() => {
        if(location.pathname.includes('Collection'))
        {
            setVisible(true);
        }
        else{
            setVisible(false)
        }
    },[location])

  return showSearch && visible?(
    <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm" type="text" placeholder="Search"/>
        <img className = "w-5" src={assests.img4} alt=""/>
        </div>
        <img onClick={() => setShowSearch(false)} className = "inline w-3 cursor-pointer" src={assests.img25} alt=""/>


    </div>
  ) :null;
}

export default Searchbar