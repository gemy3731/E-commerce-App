import React, { useContext } from 'react'
import freshCart from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserTokenContext } from '../../Context/UserTokenContext';

export default function NavBar() {
  const {token,setToken} = useContext(UserTokenContext);
  const navigate = useNavigate();
  function logOut(){
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login")
  }
  
  return (
<nav className="bg-green-300 lg:fixed top-0 left-0 right-0 z-40">
  <div className="container mx-auto">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    <div className=" w-full flex flex-wrap flex-col lg:flex-row items-center lg:w-auto" id="navbar-default">
    
        <img src={freshCart} className="h-8 me-3" alt="freshCart" />
      {token&&<ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 text-center  rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0  text-black">
        <li>
          <NavLink to="home" className="block py-2 px-3 lg:p-0  " aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink to="cart" className="block py-2 px-3 rounded lg:p-0">Cart</NavLink>
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
      </ul> }
      
    </div>
    <div className=" w-full  lg:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col items-center justify-center text-center p-4 lg:p-0 mt-4 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0  text-black">
        <li className='space-x-4'>
          <a href="https://www.instagram.com/" target='_blank'>
          <i className='fa-brands fa-instagram'></i>
          </a>
          <a href="https://www.facebook.com/" target='_blank'>
          <i className='fa-brands fa-facebook'></i>
          </a>
          <a href="https://www.tiktok.com/" target='_blank'>
          <i className='fa-brands fa-tiktok'></i>
          </a>
          <a href="https://www.twitter.com/" target='_blank'>
          <i className='fa-brands fa-twitter'></i>
          </a>
          <a href="https://www.linkedin.com/" target='_blank'>
          <i className='fa-brands fa-linkedin'></i>
          </a>
          <a href="https://www.youtube.com/" target='_blank'>
          <i className='fa-brands fa-youtube'></i>
          </a>
        </li>
        {token?<>
          <li>
          <button onClick={logOut} className="block rounded-lg py-2 lg:py-0 my-2 lg:my-0 px-3 bg-black text-white" >Log Out</button>
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
</nav>

  )
}
