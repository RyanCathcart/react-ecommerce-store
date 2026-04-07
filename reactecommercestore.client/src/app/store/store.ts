import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { errorApi } from "../../features/about/errorApi";
import { accountApi } from "../../features/account/accountApi";
import { basketApi } from "../../features/basket/basketApi";
import { catalogApi } from "../../features/catalog/catalogApi";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { checkoutApi } from "../../features/checkout/checkoutApi";
import { counterSlice } from "../../features/contact/counterSlice";
import { uiSlice } from "../layout/uiSlice";

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    catalog: catalogSlice.reducer,
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      accountApi.middleware,
      basketApi.middleware,
      catalogApi.middleware,
      checkoutApi.middleware,
      errorApi.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();