import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import { fetchBaseQuery, type FetchArgs } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
  credentials: "include"
});

type ErrorResponse = | { title: string; } | { errors: string[], title: string };

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

export const baseQueryWithErrorHandling =
  async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading());
    await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());

    if (result.error) {
      console.log(result.error)

      //const originalStatus = result.error.status === "PARSING_ERROR" && result.error.originalStatus
      //  ? result.error.originalStatus
      //  : result.error.status;

      const responseData = result.error.data as ErrorResponse;

      switch (result.error.status) {
        case 400:
          if (typeof responseData === "object" && "title" in responseData) {
            if ("errors" in responseData) {
              throw Object.values(responseData.errors).flat().join(", ");
            } else {
              toast.error(responseData.title)
            }
          }
          
          break;

        case 401:
          if (typeof responseData === "object" && "title" in responseData)
            toast.error(responseData.title);
          break;

        case 404:
          if (typeof responseData === "object")
            router.navigate("/not-found", { state: { error: responseData } })
          break;

        case 500:
          if (typeof responseData === "object")
            router.navigate("/server-error", { state: { error: responseData } })
          break;

        default:
          break;
      }
    }

    return result;
};