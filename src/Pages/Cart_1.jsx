import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from 'react';


const Cart_1 = () => {
    const [count, setCount] = useState(0);
    
    return (
        <>
            <div className=' mt-22 max-w-[1200px]  mx-auto '>
                <Link to="/" className='flex gap-1.5 items-center'><FaArrowLeft size={18} /> <span className='font-bold text-2xl'>Shopping Cart</span></Link>

                <div className='flex between items-center justify-between p-4'>
                    <h2 className='text-2xl font-semibold'>
                        Cart item(0)
                    </h2>
                    <button className=' py-1 px-4 flex items-center cursor-pointer border-2 border-black rounded-md '><RiDeleteBinLine size={18} />Clear Cart</button>
                </div>
            


                <div className='flex flex-col gap-4 p-4 border-[1.8px] border-black rounded-md'>
                    <div className='flex items-center justify-between pb-2'>
                        <div className='flex items-center gap-4'>
                            <img src="https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp" alt="Product" className='w-20 h-20 object-cover' />
                            <div>
                                <h3 className='text-lg font-semibold'>Product Title</h3>
                                <p className='text-gray-600'>Price: $100</p>
                                <p>Category</p>
                            </div>

                        </div>
                        <div className='flex items-center gap-5 '>
                            <button className='text-3xl font-bold' onClick={() => setCount(count - 1)}>-</button>
                            <span className='text-3xl font-bold'>{count}</span>
                            <button className='text-3xl font-bold' onClick={() => setCount(count + 1)}>+</button>
                        </div>
                        <button className='text-red-500 cursor-pointer'><RiDeleteBinLine size={24} /></button>
                    </div>
                    {/* Repeat above block for more products */}

                </div>
            </div>
        </>
    )
}

export default Cart_1