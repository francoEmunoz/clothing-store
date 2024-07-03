import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from "../api";
export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${api_url}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ name, category, orderBy }) => {
              let queryString = '/product/?';
              if (name) queryString += `name=${name}&`;
              if (category) queryString += `category=${category}&`;
              if (orderBy) queryString += `order_by=${orderBy}&`;
              return queryString.slice(0, -1);
            },
          }),
        getProduct: builder.query({
            query: (ID) => '/product/' + ID
        }),
        deleteOneProduct: builder.mutation({
            query: (ID) => ({
                url: `/product/${ID}`,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
        editProduct: builder.mutation({
            query: (body) => ({
                url: `/product/${body.ID}`,
                method: 'PUT',
                body: body,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
        createProduct: builder.mutation({
            query(product) {
                return {
                    url: "/product/",
                    method: "POST",
                    body: product,
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                };
            },
        })
    })
})
export default productsAPI
export const { useGetAllProductsQuery, useGetProductQuery, useDeleteOneProductMutation, useEditProductMutation, useCreateProductMutation, useGetAllProductsNoFilterMutation } = productsAPI