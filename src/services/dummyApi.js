import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fetchBaseQuery({ baseUrl:'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'products?limit=20',
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    searchProducts: builder.query({
      query: (q) => `products/search?q=${encodeURIComponent(q)}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
} = dummyApi;
