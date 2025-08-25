import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../services/dummyApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/cartSlice';
import { ring } from 'ldrs'
ring.register()
const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  // Animation refs (must be before any return)
  const buyNowRef = useRef(null);
  const addToCartRef = useRef(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
         <l-ring
          size="40"
          stroke="5"
          bg-opacity="0"
          speed="2"
          color="black"
        ></l-ring>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-red-600">Error</h1>
      </div>
    );
  }

  const animateButton = (ref, callback) => {
    if (!ref.current) return;
    ref.current.classList.add('zoom-out');
    setTimeout(() => {
      ref.current.classList.remove('zoom-out');
      if (callback) callback();
    }, 200);
  };

  const handleAddToCart = () => {
    animateButton(addToCartRef, () => dispatch(addToCart(data)));
  };

  const handleBuyNow = () => {
    animateButton(buyNowRef);
    // Add your buy now logic here
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl px-4 pt-8 mx-auto">
      <div className="">
        <div className="w-full md:w-[450px] aspect-[4/3] bg-white shadow-md rounded-lg">
          <img
            src={data?.thumbnail}
            alt="Product"
            className='w-full h-full object-contain'
          />
        </div>
      </div>

      <div className="">
        <h1 className="text-3xl font-bold">{data?.title}</h1>
        <p className="text-lg mt-2">{data?.description}</p>

        <div className="flex items-center mt-2.5 mb-3">
          <div className="flex items-center space-x-1">
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
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ml-3">
            {data?.rating.toFixed(1)}
          </span>
        </div>

        <span className="text-xl font-semibold mt-2">${data?.price}</span>

        <div className="flex gap-4 mt-4">
          <button
            ref={buyNowRef}
            className="bg-blue-500 text-white px-6 py-3 rounded cursor-pointer transition-transform duration-200"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          <button
            ref={addToCartRef}
            className="bg-blue-500 text-white px-6 py-3 rounded cursor-pointer transition-transform duration-200"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;