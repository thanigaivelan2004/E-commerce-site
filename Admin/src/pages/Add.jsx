import React from 'react';
import { assets } from '../assets/assets';
import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {

    const [image1,setImage1]=useState(false) 
    const [image2,setImage2]=useState(false)
    const [image3,setImage3]=useState(false)
    const [image4,setImage4]=useState(false)

    const[name,setName]=useState("");
    const[description,setDescription]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("Men");

    const [subCategory,setSubCategory]=useState("Topwear");
    const[bestseller,setBestseller]=useState(false);
    const[sizes,setSizes]=useState([]);

    const onSubmitHandler=async(e) => {
        e.preventDefault();
        try {
            const formData=new FormData()
            formData.append("name",name)
            formData.append("description",description)
            formData.append("price",price)
            formData.append("category",category)
            formData.append("subCategory",subCategory)
            formData.append("bestseller",bestseller)
            formData.append("sizes",JSON.stringify(sizes))

            image1 && formData.append("image1",image1)
            image2 && formData.append("image2",image2)
            image3 && formData.append("image3",image3)
            image4 && formData.append("image4",image4)

            const response=await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})
            
            if(response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }

    }



    
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-5 p-5 bg-gray-50 rounded-md shadow-md">
      <div>
        <p className="mb-2 font-medium">Upload Image</p>
        <div className="flex gap-4">
  <label htmlFor="image1" className="cursor-pointer">
    <img className="w-20 h-20 object-cover border rounded-md" src={!image1 ? assets.uploadarea:URL.createObjectURL(image1)} alt="Upload" />
    <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
  </label>
  
  <label htmlFor="image2" className="cursor-pointer">
    <img className="w-20 h-20 object-cover border rounded-md" src={!image2 ? assets.uploadarea:URL.createObjectURL(image2)} alt="Upload" />
    <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
  </label>
  
  <label htmlFor="image3" className="cursor-pointer">
    <img className="w-20 h-20 object-cover border rounded-md" src={!image3 ? assets.uploadarea:URL.createObjectURL(image3)} alt="Upload" />
    <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
  </label>
  
  <label htmlFor="image4" className="cursor-pointer">
    <img className="w-20 h-20 object-cover border rounded-md" src={!image4 ? assets.uploadarea:URL.createObjectURL(image4)} alt="Upload" />
    <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
  </label>
</div>

      </div>

      <div className="w-full">
        <p className="mb-2 font-medium">Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name}
          className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2 font-medium">Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description}
          className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-4">
        <div className="w-full sm:w-auto">
          <p className="mb-2 font-medium">Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <p className="mb-2 font-medium">Sub Category</p>
          <select onChange={(e)=>setSubcategory(e.target.value)}  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Sub Category</option>
            <option value="Top-wear">Topwear</option>
            <option value="Bottom-wear">Bottomwear</option>
            <option value="Winter-wear">Winterwear</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <p className="mb-2 font-medium">Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Enter price"
            min="0"
            required
          />
        </div>
      </div>
      <div>
        <p className='mb-2'>Product sizes</p>
        <div className='flex gap-3'>
        <div onClick={()=>setSizes(prev =>prev.includes("S") ? prev.filter(item =>item!== "S"): [...prev,"S"])}>
               <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`} >S</p> 
            </div>
            <div onClick={()=>setSizes(prev =>prev.includes("M") ? prev.filter(item =>item!== "M"): [...prev,"M"])}>
               <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`} >M</p> 
            </div>
            <div onClick={()=>setSizes(prev =>prev.includes("L") ? prev.filter(item =>item!== "L"): [...prev,"L"])}>
               <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p> 
            </div>
            <div onClick={()=>setSizes(prev =>prev.includes("XL") ? prev.filter(item =>item!== "XL"): [...prev,"XL"])}>
               <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p> 
            </div>
            <div onClick={()=>setSizes(prev =>prev.includes("XXL") ? prev.filter(item =>item!== "XXL"): [...prev,"XXL"])}>
               <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p> 
            </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input onChange={()=>setBestseller(prev =>!prev)} checked={bestseller} type="checkbox"  id="bestseller"/>
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
    </form>
  );
};

export default Add;
