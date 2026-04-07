import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Address, User } from "../../app/models/user";
import { router } from "../../app/routes/Routes";
import type { LoginSchema } from "../../app/util/schemas/loginSchema";
import type { RegisterSchema } from "../../app/util/schemas/registerSchema";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterSchema>({
      query: (creds) => {
        return {
          url: "account/register",
          method: "POST",
          body: creds
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Registration successful - you can now sign in!");
          router.navigate("/login");
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    }),
    login: builder.mutation<void, LoginSchema>({
      query: (creds) => {
        return {
          url: "login?useCookies=true",
          method: "POST",
          body: creds
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(["UserInfo"]));
        } catch (error) {
          console.log(error);
        }
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: "account/logout",
        method: "POST"
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountApi.util.invalidateTags(["UserInfo"]));
        router.navigate("/");
      }
    }),
    userInfo: builder.query<User, void>({
      query: () => ({ url: "account/user-info" }),
      providesTags: ["UserInfo"]
    }),
    fetchAddress: builder.query<Address, void>({
      query: () => ({
        url: "account/address"
      })
    }),
    updateUserAddress: builder.mutation<Address, Address>({
      query: (address) => ({
        url: "account/address",
        method: "POST",
        body: address
      }),
      onQueryStarted: async (address, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          accountApi.util.updateQueryData("fetchAddress", undefined, (draft) => {
            Object.assign(draft, { ...address });
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.log(error);
        }
      }
    })
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserInfoQuery,
  useLazyUserInfoQuery,
  useFetchAddressQuery,
  useUpdateUserAddressMutation
} = accountApi;