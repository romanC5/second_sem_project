import React from 'react'
import Header from '../Components/Header'
import product from '../assets/discount-shopping-season-with-sale.jpg'
import { useParams } from 'react-router'
import { useGetProductByIdQuery } from '../services/dummyApi'
const SingleProduct = () => {

  const id = useParams()
  const { data } = useGetProductByIdQuery(id?.id)
  console.log("Single Product Data:", data);
  return (
    <div>
      <Header />

      <div className='flex items-center justify-center h-100vh w-100vw'>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mt-16 px-4">
          <div className="max-w-[550px] max-h-[500px] p-4 flex items-center justify-center">
            <img
              src={product}
              alt="Product Image"
              className="object-contain w-full h-full"
            />
          </div>

          <div className='flex flex-col justify-center items-start '>
            <h1 className='text-3xl font-bold'>Product Title</h1>
            <p className='text-lg mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim dignissimos odio sed esse aut voluptatibus, suscipit officiis odit illo, sit repellendus sequi iste quia id exercitationem atque impedit. Sit, eaque!</p>
            <div className="flex items-center mt-2.5 ">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(data?.rating) ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                {data?.rating.toFixed(1)}
              </span>
            </div>
            <span className='text-xl font-semibold mt-4'>$99.99</span>
            <div className="flex gap-3.5 mt-4 ">
              <button className='bg-blue-500 text-white px-13.5 py-3 rounded cursor-pointer'>Buy Now</button>
              <button className='bg-blue-500 text-white px-10.5 py-3 rounded cursor-pointer'>Add to Cart</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default SingleProduct
