import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fetchBaseQuery({ baseUrl:'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'products?limit=40&skip=8',
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    searchProducts: builder.query({
      query: (q) => `products/search?q=${encodeURIComponent(q)}`,
    }),
    getCategories: builder.query({
      query: () => 'products/categories',
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products/category/${encodeURIComponent(category)}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = dummyApi;
