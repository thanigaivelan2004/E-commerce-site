import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { About } from './pages/About'
import {Navbar} from './components/Navbar'
import {Cart} from './pages/Cart'
import {Collection} from './pages/Collection'
import {Contact} from './pages/Contact'
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {Orders} from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer/>
    <Navbar/>
    <Searchbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Collection' element={<Collection/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Product/:ProductId' element={<Product/>}/>
        <Route path='/Cart' element={<Cart/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/PlaceOrder' element={<PlaceOrder/>}/>
      <Route path='/Orders' element={<Orders/>}/>
      <Route path='/Verify' element={<Verify/>}/>



      </Routes>
      <Footer/>

    </div>
  )
}

export default App