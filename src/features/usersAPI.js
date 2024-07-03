import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from '../api';
export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${api_url}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({

        profile: builder.query({
            query: (ID) => ({
                url: `/user/${ID}`,
                method: 'GET',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
        signUp: builder.mutation({
            query: (body) => ({
                url: '/signup/',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Post'],
        }),
        signIn: builder.mutation({
            query: (body) => ({
                url: '/login/',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Post'],
        }),
        signInToken: builder.mutation({
            query: (token) => ({
                url: '/token/',
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            })
        }),
        signOut: builder.mutation({
            query: (ID) => ({
                url: `/logout/${ID}`,
                method: 'POST',
            }),
            invalidatesTags: ['Post'],
        }),
        editProfile: builder.mutation({
            query: (body) => ({
                url: `/user/${body.ID}`,
                method: 'PUT',
                body: body,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }),
        }),
    })
})
export default usersAPI
export const { useProfileQuery, useSignUpMutation, useSignInMutation, useSignOutMutation, useSignInTokenMutation, useEditProfileMutation } = usersAPI