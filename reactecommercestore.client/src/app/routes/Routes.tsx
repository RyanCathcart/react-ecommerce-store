import { createBrowserRouter, Navigate } from "react-router";
import App from "../../App";
import AboutPage from "../../features/about/AboutPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import InventoryPage from "../../features/admin/InventoryPage";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import OrderDetails from "../../features/orders/OrderDetails";
import OrdersPage from "../../features/orders/OrdersPage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <RequireAuth />, children: [
        { path: "checkout", element: <CheckoutPage /> },
        { path: "checkout/success", element: <CheckoutSuccess /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "orders/:id", element: <OrderDetails /> },
        { path: "inventory", element: <InventoryPage /> }, // Need to restrict this route to allow only "Admin" role.
      ]},
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "basket", element: <BasketPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ]
  }
]);