import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { errorApi } from "../../features/about/errorApi";
import { accountSlice } from "../../features/account/accountSlice";
import { basketApi } from "../../features/basket/basketApi";
import { catalogApi } from "../../features/catalog/catalogApi";
import { counterSlice } from "../../features/contact/counterSlice";
import { uiSlice } from "../layout/uiSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";

export const store = configureStore({
  reducer: {
    [basketApi.reducerPath]: basketApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    account: accountSlice.reducer,
    catalog: catalogSlice.reducer,
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      basketApi.middleware,
      catalogApi.middleware,
      errorApi.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();