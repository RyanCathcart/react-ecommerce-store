import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { router } from "./app/routes/Routes";
import { store } from "./app/store/store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position="bottom-right" theme="colored" hideProgressBar />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);