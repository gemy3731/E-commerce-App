import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Home/Home";
import NotFound from "./Component/NotFound/NotFound";
import LayOut from "./Component/LayOut/LayOut";
import Cart from "./Component/Cart/Cart";
import Products from "./Component/Products/Products";
import Categories from "./Component/Categories/Categories";
import Brands from "./Component/Brands/Brands";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import UserTokenContextProvider from "./Context/UserTokenContext";
import ProtectedRoutes from "./Component/ProtectedRoutes/ProtectedRoutes";
import ProtectedRoutesRegister from "./Component/ProtectedRoutesRegister/ProtectedRoutesRegister";
import ProductDetails from "./Component/productDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Checkout from "./Component/Checkout/Checkout";
import WishListContextProvider, { WishListContext } from './Context/WishListContext';
import WishList from "./Component/WishList/WishList";
import SpecificCategory from "./Component/SpecificCategory/SpecificCategory";
import SpecificBrand from "./Component/SpecificBrand/SpecificBrand";
import Order from "./Component/Order/Order";

const query = new QueryClient();
const router = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutesRegister>
            <Register />
          </ProtectedRoutesRegister>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRoutesRegister>
            <Register />
          </ProtectedRoutesRegister>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRoutesRegister>
            <Login />
          </ProtectedRoutesRegister>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "specificCategory/:categoryId",
        element: (
          <ProtectedRoutes>
            <SpecificCategory />
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        ),
      },
      {
        path: "specificBrand/:brandId",
        element: (
          <ProtectedRoutes>
            <SpecificBrand />
          </ProtectedRoutes>
        ),
      },
      {
        path: "productdetails/:id/:categoryId",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoutes>
            <Checkout />
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoutes>
            <WishList />
          </ProtectedRoutes>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoutes>
            <Order />
          </ProtectedRoutes>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <UserTokenContextProvider>
          <WishListContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools></ReactQueryDevtools>
            <Toaster />
          </CartContextProvider>
          </WishListContextProvider>
        </UserTokenContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
