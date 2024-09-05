import React from 'react'
import NavBar from './../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import ScrollUp from './../ScrollUp/ScrollUp';

export default function LayOut() {
  return (
    <>
    <NavBar/>
    <div className='container mx-auto min-h-[95vh] lg:max-w-[1080px] pt-6 lg:pt-24 px-4'>
    <Outlet />
    </div>
    <div className='mt-14 footerShadow'>
    <Footer/>
    </div>
    <ScrollUp/>
    </>
  )
}
