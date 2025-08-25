import React from 'react';
import { useGetAllProductsQuery, useSearchProductsQuery } from '../services/dummyApi';
import { Link, useLocation } from 'react-router-dom';
import { ring } from 'ldrs';
ring.register();

const Home = () => {
  // Get search param from URL (e.g., /?q=phone)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get('q') || '';

  // All products
  const { data: allData, error: allError, isLoading: allLoading } = useGetAllProductsQuery();
  // Search products
  const { data: searchData, error: searchError, isLoading: searchLoading } = useSearchProductsQuery(searchTerm, { skip: !searchTerm });

  // Show loading spinner if loading
  if ((searchTerm && searchLoading) || (!searchTerm && allLoading)) {
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
  if ((searchTerm && searchError) || (!searchTerm && allError)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-red-600">404</h1>
      </div>
    );
  }

  // Decide which products to show
  const products = searchTerm ? searchData?.products : allData?.products;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 h-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map((data) => (
            <Link to={`/product/${data?.id}`} key={data?.id}>
              <div className="h-96 border border-gray-200 rounded-lg shadow-sm">
                <img
                  className="p-1.5 rounded-t-lg w-full h-58 object-contain"
                  src={data?.thumbnail}
                />
                <h5 className="text-xl font-semibold tracking-tight text-black-900 dark:text-black pl-5 pt-2">
                  {data?.title}
                </h5>
                <div className="px-5 pb-5">
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 22 20"
                          fill={i < Math.round(data?.rating) ? '#FACC15' : 'none'}
                          stroke="#FACC15"
                          strokeWidth="1.5"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="bg-blue-100 text-black-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-black-800 ms-3">
                      {data?.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">
                      ${data?.price}
                    </span>
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