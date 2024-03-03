import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "app",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),

  endpoints: (builder) => ({
    // creating the user
    signupUser: builder.mutation({
      query: (userDetails) => ({
        url: "/signup",
        method: "POST",
        body: userDetails,
      }),
    }),
    //login the user
    loginUser: builder.mutation({
      query: (userDetails) => ({
        url: "/login",
        method: "POST",
        body: userDetails,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
 
} = appApi;

export const { useGetPostsQuery } = appApi;