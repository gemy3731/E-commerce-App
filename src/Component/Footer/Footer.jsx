import React from 'react'
import freshCart from '../../assets/images/freshcart-logo.svg'

export default function Footer() {
  return (
    <div className='bg-white border-gray-300 p-5 text-center'>
      <div className="container w-[80%] mx-auto">
        <div className='flex flex-col justify-center lg:flex-row lg:justify-between items-center'>
          <div className='w-2/6 lg:w-1/6 lg:me-auto'>
            <img className='w-full' src={freshCart} alt="logo" />
          </div>
      <div className=" w-full lg:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col items-center justify-center text-center p-4 lg:p-0 mt-4 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 text-xl  text-black">
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
        </ul>
        </div>
        </div>
        <p>Copy Right 2018 © By Daniels All Rights Reserved</p>
      </div>
    </div>
  )
}
