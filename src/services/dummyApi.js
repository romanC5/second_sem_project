import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API URL - change this to your deployed backend URL when in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // Get token from localStorage if it exists
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'Category', 'User'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return queryString ? `products?${queryString}` : 'products';
      },
      transformResponse: (response) => {
        // Backend returns { success, data, count }
        return {
          data: response.data || [],
          total: response.count || 0
        };
      },
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    searchProducts: builder.query({
      query: (q) => `products?search=${encodeURIComponent(q)}`,
      transformResponse: (response) => {
        return {
          products: response.data || [],
          total: response.count || 0
        };
      },
    }),
    getCategories: builder.query({
      query: () => 'products/categories',
      transformResponse: (response) => response.data || [],
      providesTags: ['Category'],
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products?category=${encodeURIComponent(category)}`,
      transformResponse: (response) => {
        return {
          products: response.data || [],
          total: response.count || 0
        };
      },
    }),
    getFeaturedProducts: builder.query({
      query: () => 'products/featured',
      transformResponse: (response) => {
        return {
          products: response.data || [],
          total: response.count || 0
        };
      },
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: 'products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...productData }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: productData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }, 'Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    // Auth endpoints
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query({
      query: () => 'auth/me',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: 'auth/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: 'auth/password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetFeaturedProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = dummyApi;
