import React, { useState } from 'react';
import { useGetAllProductsQuery, useSearchProductsQuery } from '../services/dummyApi';
import { Link, useLocation } from 'react-router-dom';
import { ring } from 'ldrs';
ring.register();

const Home = () => {
  // Get search param from URL (e.g., /?q=phone)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get('q') || '';

  // Category state
  const [selectedCategory, setSelectedCategory] = useState('');

  // Build query params
  const queryParams = {};
  if (selectedCategory) queryParams.category = selectedCategory;
  if (searchTerm) queryParams.search = searchTerm;

  // Fetch products with filters
  const { data: productsData, error, isLoading } = useGetAllProductsQuery(queryParams);

  // Available categories (hardcoded from backend enum)
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Living',
    'Sports',
    'Books',
    'Food',
    'Health',
    'Toys',
    'Other'
  ];

  // Show loading spinner if loading
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

  // Show error if error
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-red-600">Error loading products</h1>
      </div>
    );
  }

  // Get products from API response
  const products = productsData?.data || [];

  return (
  <div className="w-full px-1 sm:px-3 lg:px-8 h-full">
      {/* Category Dropdown */}
      <div className="w-full mb-4">
        <select
          className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>{cat}</option>
          ))}
        </select>
      </div>
  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product?._id}`} key={product?._id}>
              <div className="border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col h-48 xs:h-56 sm:h-64 md:h-96">
                <img
                  className="p-1.5 rounded-t-lg w-full h-24 xs:h-28 sm:h-32 md:h-58 object-contain mx-auto"
                  src={product?.images?.[0] || 'https://via.placeholder.com/300'}
                  alt={product?.name}
                />
                <h5 className="text-xs xs:text-sm sm:text-base md:text-xl font-semibold tracking-tight text-black-900 dark:text-black px-2 pt-1 md:pl-5 md:pt-2 truncate">
                  {product?.name}
                </h5>
                <div className="px-2 pb-2 md:px-5 md:pb-5 flex flex-col flex-1 justify-end">
                  <div className="flex items-center mt-1 mb-2 md:mt-2.5 md:mb-5">
                    <div className="flex items-center space-x-0.5 md:space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3 h-3 xs:w-4 xs:h-4 md:w-4 md:h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 22 20"
                          fill={i < Math.round(product?.rating || 0) ? '#FACC15' : 'none'}
                          stroke="#FACC15"
                          strokeWidth="1.5"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="bg-blue-100 text-black-800 text-xs font-semibold px-1.5 py-0.5 md:px-2.5 md:py-0.5 rounded-sm ms-2 md:ms-3">
                      {(product?.rating || 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg xs:text-xl md:text-3xl font-bold">
                      ${product?.discountPrice || product?.price}
                    </span>
                    {product?.discountPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product?.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-10">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Home;