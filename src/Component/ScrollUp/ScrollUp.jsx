import React, { useState } from 'react'

export default function ScrollUp() {
    const [scroll, setScroll] = useState(0)
    window.addEventListener("scroll",()=>{
        setScroll(scrollY)
    })
    function scrollToTop() {
        scrollTo({
            top :0,
            behavior:'smooth'
        })
    }
    
  return (
    <div onClick={scrollToTop} className={scroll<300?"hidden":`fixed right-14 bottom-14`}>
        <i className='fa fa-arrow-alt-circle-up fa-3x text-green-600 cursor-pointer'></i>
    </div>
  )
}
