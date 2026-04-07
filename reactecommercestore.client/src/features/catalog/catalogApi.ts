import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Pagination } from "../../app/models/pagination";
import type { Product } from "../../app/models/product";
import type { ProductParams } from "../../app/models/productParams";
import { filterEmptyValues } from "../../app/util/util";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<{ items: Product[], pagination: Pagination; }, ProductParams>({
      query: (productParams) => {
        return {
          url: "products",
          params: filterEmptyValues(productParams)
        }
      },
      transformResponse: (items: Product[], meta) => {
        const paginationHeader = meta?.response?.headers.get("Pagination");
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

        return { items, pagination };
      }
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => ({ url: `products/${productId}` })
    }),
    fetchFilters: builder.query<{ brands: string[], types: string[]; }, void>({
      query: () => ({ url: "products/filters" })
    })
  })
});

export const { useFetchProductsQuery, useFetchProductDetailsQuery, useFetchFiltersQuery } = catalogApi;