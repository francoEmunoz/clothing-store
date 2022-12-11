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
            query: (obj) => `/products?product=${obj.product}&category=${obj.category}&sort=${obj.sort}`
        }),
        getProduct: builder.query({
            query: (id) => '/products/' + id
        }),
        deleteOneProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
        editProduct: builder.mutation({
            query: (body) => ({
                url: `/products/${body._id}`,
                method: 'PATCH',
                body: body,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
        getNewProduct: builder.mutation({
            query(product) {
                return {
                    url: "/products",
                    method: "POST",
                    body: product,
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                };
            },
        }),
        getAllProductsNoFilter: builder.mutation({
            query: () => ({
                url: `/products`,
                method: 'GET',
            })
        }),
    })
})
export default productsAPI
export const { useGetAllProductsQuery, useGetProductQuery, useDeleteOneProductMutation, useEditProductMutation, useGetNewProductMutation, useGetAllProductsNoFilterMutation } = productsAPI