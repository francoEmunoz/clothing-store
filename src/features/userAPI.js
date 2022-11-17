import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from "../api";
export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${api_url}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({

        profileOne: builder.mutation({
                query: (id) => ({
                url: `/users/${id}`,
                method: 'GET',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }),
        signUp: builder.mutation({
            query: (body) => ({
                url: '/users/signup',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Post'],
        }),
        signIn: builder.mutation({
            query: (body) => ({
                url: '/users/signin',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Post'],
        }),
        signInToken: builder.mutation({
            query: (token) => ({
                url: '/users/token',
                method: 'GET',
                headers: {Authorization: `Bearer ${token}` }
            })
        }),
        signOut: builder.mutation({
            query: (id) => ({
                url: `/users/signout/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Post'],
        }),
        editProfile: builder.mutation({
            query: (body) => ({
                url: `/users/${body._id}`,
                method: 'PATCH',
                body: body,
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }),
        }),
    })
})
export default usersAPI
export const { useProfileOneMutation ,useSignUpMutation, useSignInMutation, useSignOutMutation, useSignInTokenMutation, useEditProfileMutation } = usersAPI