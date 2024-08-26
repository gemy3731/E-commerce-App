import React from 'react'
import { FadeLoader } from 'react-spinners'

export default function SubLoader() {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-700 bg-opacity-50'>
        <FadeLoader color='#fff' />
    </div>
  )
}
