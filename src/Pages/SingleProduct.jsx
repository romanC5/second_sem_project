import React from 'react'
import Header from '../Components/Header'
import product from '../assets/discount-shopping-season-with-sale.jpg'
const SingleProduct = () => {
  return (
    <div>
      <Header/>
      <div className='flex items-center justify-center h-100vh w-100vw'>
        <div className='flex'>
          <div className=''>
            <img src={product} alt="" srcset="" className='h-60 w-90 rounded-2xl object-contain' />
          </div>
          <div className='flex flex-col justify-center items-start p-5'>
            <h1 className='text-3xl font-bold'>Product Title</h1>
            <p className='text-lg mt-2'>Product description goes here. It provides details about the product features and specifications.</p>
            <span className='text-xl font-semibold mt-4'>$99.99</span>
            <button className='mt-4 bg-blue-500 text-white px-2.5 py-2.5 rounded cursor-pointer'>Add to Cart</button>
        </div>
         
      </div>

    </div>
    </div>
  )
}

export default SingleProduct
