import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Component/Home/Home';
import NotFound from './Component/NotFound/NotFound';
import LayOut from './Component/LayOut/LayOut';
import Cart from './Component/Cart/Cart';
import Products from './Component/Products/Products';
import Categories from './Component/Categories/Categories';
import Brands from './Component/Brands/Brands';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import UserTokenContextProvider from './Context/UserTokenContext'
import ProtectedRoutes from './Component/ProtectedRoutes/ProtectedRoutes'
import ProtectedRoutesRegister from './Component/ProtectedRoutesRegister/ProtectedRoutesRegister'
const router =createBrowserRouter([
  {path:'',element:<LayOut />,children:[
    {index:true, element:<ProtectedRoutesRegister><Register/></ProtectedRoutesRegister>},
    {path:'register', element:<ProtectedRoutesRegister><Register/></ProtectedRoutesRegister>},
    {path:'login', element:<ProtectedRoutesRegister><Login/></ProtectedRoutesRegister>},
    {path:'home', element:<ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:'cart', element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
    {path:'products', element:<ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:'categories', element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
    {path:'brands', element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
    
    {path:'*', element:<NotFound/>}
  ]}
])
function App() {

  return (
    <>
    <UserTokenContextProvider>
      <RouterProvider router={router} />

    </UserTokenContextProvider>

      
    </>
  )
}

export default App
