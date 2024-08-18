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
const router =createBrowserRouter([
  {path:'',element:<LayOut />,children:[
    {index:true, element:<Home/>},
    {path:'home', element:<Home/>},
    {path:'cart', element:<Cart/>},
    {path:'products', element:<Products/>},
    {path:'categories', element:<Categories/>},
    {path:'brands', element:<Brands/>},
    {path:'login', element:<Login/>},
    {path:'register', element:<Register/>},
    
    {path:'*', element:<NotFound/>}
  ]}
])
function App() {

  return (
    <>
      <RouterProvider router={router} />

      
    </>
  )
}

export default App
