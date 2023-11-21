import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store/configureStore";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { router } from "./app/router/Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
