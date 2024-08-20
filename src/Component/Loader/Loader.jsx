import React from 'react'
import { FadeLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='h-[90vh] flex justify-center items-center'>
        <FadeLoader color='#4fa74f' />
    </div>
  )
}
