import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { CreateOrder, Order } from "../../app/models/order";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchOrders: builder.query<Order[], void>({
      query: () => ({ url: "orders" })
    }),
    fetchOrderDetails: builder.query<Order, number>({
      query: (orderId) => ({ url: `orders/${orderId}` })
    }),
    createOrder: builder.mutation<Order, CreateOrder>({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order
      })
    })
  })
});

export const { useFetchOrdersQuery, useFetchOrderDetailsQuery, useCreateOrderMutation } = orderApi;