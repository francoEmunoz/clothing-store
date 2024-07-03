import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from "../api";

export const commentsAPI = createApi({
    reducerPath: 'commentsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${api_url}`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().logged.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllComments: builder.query({
            query: () => `/question/`
        }),
        deleteComment: builder.mutation({
            query: (ID) => ({
                url: `/question/${ID}`,
                method: 'DELETE',
            })
        }),
        editComment: builder.mutation({
            query: (body) => ({
                url: `/comment/${body.ID}`,
                method: 'PUT',
                body: body,
            })
        }),
        createComment: builder.mutation({
            query: (comment) => ({
                url: "/question/",
                method: "POST",
                body: comment,
            }),
        }),
    }),
});

export default commentsAPI
export const { useGetAllCommentsQuery, useDeleteCommentMutation, useEditCommentMutation, useCreateCommentMutation } = commentsAPI