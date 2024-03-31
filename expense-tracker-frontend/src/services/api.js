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

    getUser: builder.mutation({
      query: (userToken) => ({
        url: "/get-user",
        method: "POST",
        body: userToken,
      }),
    }),

    //Add-Expense
    addExpense: builder.mutation({
      query: (expenseDetails) => ({
        url: "/add-expense",
        method: "POST",
        body: expenseDetails,
      }),
    }),
    //get-expense
    getExpense: builder.mutation({
      query: ( userToken, currentPage,perPage ) => ({
        url: `/get-expense`,
        method: "POST",
        body: userToken,perPage,
        params:{page:currentPage}
      }),
    }),
    //delete-expense
    deleteExpense: builder.mutation({
      query: (userToken,expenseId) => ({
        url: "/delete-expense",
        method: "POST",
        body: userToken,expenseId
      }),
    }),
    //purchase-membership
    purchaseMembership:builder.mutation({
      query: (userToken) => ({
        url: "/purchase-membership",
        method: "POST",
        body: userToken
      }),
    }),
    //update-purchase
    updateOrder:builder.mutation({
      query: (userToken,orderDetails) => ({
        url: "/update-order",
        method: "POST",
        body: userToken,orderDetails
      }),
    }),
    //
    showLeaderboard:builder.mutation({
      query: () => ({
        url: "/show-leaderboard",
        method: "GET",
      })
    }),
    //forgot Password
    forgotPassword:builder.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body:email
      }),
    }),
    //Download Expense using AWS S3
    downloadExpenses:builder.mutation({
      query: (userToken) => ({
        url: "/download-expense",
        method: "POST",
        body: userToken
      }),
    }),

  }),
 




});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetUserMutation,
  useAddExpenseMutation,
  useGetExpenseMutation,
  useDeleteExpenseMutation,
  usePurchaseMembershipMutation,
  useUpdateOrderMutation,
  useShowLeaderboardMutation,
  useForgotPasswordMutation,
  useDownloadExpensesMutation
 
} = appApi;

export const { useGetPostsQuery } = appApi;