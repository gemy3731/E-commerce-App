import React, { useContext, useEffect, useState } from 'react'
import freshCart from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserTokenContext } from '../../Context/UserTokenContext';
import { CartContext } from '../../Context/CartContext';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const {token,setToken} = useContext(UserTokenContext);
  const {cartNum, setCartNum,getCartProducts} = useContext(CartContext);
  useEffect(()=>{
    if(token) cartNumber()
  },[cartNum])
  
  const navigate = useNavigate();
  function logOut(){
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login")
  }
  async function cartNumber() {
    const res = await getCartProducts()
   if(token) setCartNum(res.data.numOfCartItems)          //update cart notification 
  }
  
  return (
<nav className="bg-white shadow-xl lg:fixed top-0 left-0 right-0 z-40 fluid">
  <div className="container mx-auto">
  <div className="max-w-screen-2xl mx-auto py-4">
    <div className='lg:hidden flex justify-between px-6 lg:px-0'>
    <div>
        <img src={freshCart} className="h-8" alt="freshCart" />
      </div>
  <button onClick={()=>setIsOpen(!isOpen)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
  <span className="sr-only">Open main menu</span>
  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
  </svg>
</button>
    </div>
    <div className={`${isOpen?"":"hidden "}lg:block w-full lg:w-auto`} id="navbar-default">
    <div className="flex flex-wrap flex-col lg:flex-row items-center lg:justify-around ">
      <div className='hidden lg:block'>
        <img src={freshCart} className="h-8" alt="freshCart" />
      </div>
      <div>
      {token&&<ul className="font-medium flex flex-col text-xl p-4 lg:p-0 mt-4 text-center rounded-lg lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0  text-black">
        <li>
          <NavLink to="home" className="block py-2 px-3 lg:p-0  " aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink to="cart" className="  block py-2 px-3 rounded lg:p-0"><span className='me-1'>Cart</span>
          <span className='relative'>
            <i className="fa-solid fa-cart-arrow-down "></i>
            {cartNum>0 &&<span className=' bg-green-500 block absolute top-[-80%] left-[90%] text-sm cartN'>{cartNum}</span>}
            </span>
            </NavLink>
        </li>
        <li>
          <NavLink to="wishList" className="block py-2 px-3 rounded lg:p-0">WishList</NavLink>
        </li>
        <li>
          <NavLink to="products" className="block py-2 px-3 rounded lg:p-0">Products</NavLink>
        </li>
        <li>
          <NavLink to="categories" className="block py-2 px-3 rounded lg:p-0">Categories</NavLink>
        </li>
        <li>
          <NavLink to="brands" className="block py-2 px-3 rounded lg:p-0">Brands</NavLink>
        </li>
        <li>
          <NavLink to="allOrders" className="block py-2 px-3 rounded lg:p-0">Orders</NavLink>
        </li>
      </ul> }
      </div>
    <div className=" w-full lg:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col items-center justify-center text-center p-4 lg:p-0 mt-4 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 text-xl  text-black">
        {token?<>
          <li>
          <button onClick={logOut} className="block rounded-lg py-2 lg:py-1 my-2 lg:my-0 px-3 bg-black text-white" >Log Out</button>
        </li>
        </>:<>
        <li>
          <Link to="login" className="block py-2 lg:py-0 my-2 lg:my-0 px-3  rounded-lg  bg-black text-white hover:text-white" >Login</Link>
        </li>
        <li>
          <Link to="register" className="block py-2 lg:py-0 px-3 my-2 lg:my-0 rounded-lg  bg-black text-white hover:text-white" >Register</Link>
        </li>
        </>}
      </ul>
    </div>
    </div>
    </div>
  </div>
  </div>
</nav>
  )
}
