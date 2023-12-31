import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["books"],
    }),
    postBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query(id) {
        return {
          url: `/book/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["books"],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    postReview: builder.mutation({
      query: (data) => ({
        url: `/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["reviews"],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetBooksQuery,
  usePostCommentMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  usePostBookMutation,
  useSingleBookQuery,
  usePostReviewMutation,
  useGetReviewsQuery,
} = bookApi;