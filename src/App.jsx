import { lazy, Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./Component/Home/Home";
import NotFound from "./Component/NotFound/NotFound";
import LayOut from "./Component/LayOut/LayOut";
// import Cart from "./Component/Cart/Cart";
// import Products from "./Component/Products/Products";
// import Categories from "./Component/Categories/Categories";
// import Brands from "./Component/Brands/Brands";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import UserTokenContextProvider from "./Context/UserTokenContext";
import ProtectedRoutes from "./Component/ProtectedRoutes/ProtectedRoutes";
import ProtectedRoutesRegister from "./Component/ProtectedRoutesRegister/ProtectedRoutesRegister";
// import ProductDetails from "./Component/productDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import Checkout from "./Component/Checkout/Checkout";
import WishListContextProvider, { WishListContext } from './Context/WishListContext';
// import WishList from "./Component/WishList/WishList";
// import SpecificCategory from "./Component/SpecificCategory/SpecificCategory";
// import SpecificBrand from "./Component/SpecificBrand/SpecificBrand";
// import Order from "./Component/Order/Order";
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";

const Home = lazy(()=>import('./Component/Home/Home'))
const Cart = lazy(()=>import('./Component/Cart/Cart'))
const Products = lazy(()=>import('./Component/Products/Products'))
const Categories = lazy(()=>import('./Component/Categories/Categories'))
const Brands = lazy(()=>import('./Component/Brands/Brands'))
const ProductDetails = lazy(()=>import('./Component/productDetails/ProductDetails'))
const Checkout = lazy(()=>import('./Component/Checkout/Checkout'))
const WishList = lazy(()=>import('./Component/WishList/WishList'))
const SpecificCategory = lazy(()=>import('./Component/SpecificCategory/SpecificCategory'))
const SpecificBrand = lazy(()=>import('./Component/SpecificBrand/SpecificBrand'))
const Order = lazy(()=>import('./Component/Order/Order'))

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
        path: "forgotpassword",
        element: (
          <ProtectedRoutesRegister>
            <ForgotPassword />
          </ProtectedRoutesRegister>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <Home />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <Cart />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <Products />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <Categories />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "specificCategory/:categoryId",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <SpecificCategory />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <Brands />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "specificBrand/:brandId",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <SpecificBrand />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "productdetails/:id/:categoryId",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <ProductDetails />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <ProductDetails />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <Checkout />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <WishList />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoutes>
            <Suspense>
            <Order />
            </Suspense>
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
