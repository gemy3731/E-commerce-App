import React from 'react'
import NavBar from './../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function LayOut() {
  return (
    <>
    <NavBar/>
    <div className='container mx-auto min-h-[95vh] pt-6 lg:pt-24'>
    <Outlet />
    </div>
    <div className='mt-8'>
    <Footer/>
    </div>
    </>
  )
}
