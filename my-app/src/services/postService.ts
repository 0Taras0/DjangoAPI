import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery";
import type {ICreatePostRequest} from "../types/posts/ICreatePostRequest.ts";
import {serialize} from "object-to-formdata";
import type {IPost} from "../types/posts/IPost.ts";

export const postService = createApi({
    reducerPath: 'postService',
    baseQuery: createBaseQuery('posts'),
    tagTypes: ['Posts'],

    endpoints: (builder) => ({
        getPosts: builder.query<IPost[], void>({
            query: () => ({
                url: '',
                method: 'GET',
            }),
            providesTags: ['Posts'],
        }),
        getPostById: builder.query<IPost, number>({
            query: (id) => ({
                url: `${id}/`,
                method: 'GET',
            }),
            providesTags: ['Posts'],
        }),
        createPost: builder.mutation<IPost, ICreatePostRequest>({
            query: (data) => {
                const formData = serialize(data);

                return {
                    url: '',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Posts'],
        }),
    })
});

export const {
    useGetPostsQuery,
    useLazyGetPostsQuery,
    useGetPostByIdQuery,
    useCreatePostMutation,
} = postService;