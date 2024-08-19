
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export default function Register() {
  const [apiError,setApiError] = useState(null)
  const [isLoading ,setIsLoading] = useState(false);
  const navigate = useNavigate()

  const initialValues = {
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  }
  const onSubmit = (value)=>{
    setApiError(null);
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value)
    .then((res)=>{
      navigate("/login")
      setIsLoading(false);
    })
    .catch((err)=>{
      setApiError(err.response.data.message);
      setTimeout(()=>setApiError(null),5000);
      setIsLoading(false);
    })
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema:yup.object().shape({
      name : yup.string().required("Name required").min(3,"Minimum name length is 3 characters").max(15,"Maxmum name length is 15 characters"),
      email:yup.string().required("Email required").email("Enter invalid email"),
      password:yup.string().required("Password required").matches(/^[A-Z][a-z0-9]{5,}$/),
      rePassword:yup.string().required("Repassword required").oneOf([yup.ref("password"),"Repassword should match password"]),
      phone:yup.string().required("Phone required").matches(/^01[0125][0-9]{8}$/)
    })
  })
  return (
    <div className='p-10 w-[75%] mx-auto'>
    <h2 className='text-4xl mb-4'>Register Now:</h2>
    
    {apiError&& <div className=' bg-red-500 text-white p-3 rounded-lg mb-4'><h2 >{apiError}</h2></div>}
    <form onSubmit={formik.handleSubmit} >
      <label htmlFor="name">Name:</label>
      <input id='name' type="text" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name='name' className='border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4' />
      {formik.errors.name && formik.touched.name&& (<div className=' bg-red-500 text-white p-3 rounded-lg mb-4'><h2 >{formik.errors.name}</h2></div>)}
      <label htmlFor="email">Email:</label>
      <input id='email' type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' className='border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4' />
      {formik.errors.email && formik.touched.email&& (<div className=' bg-red-500 text-white p-3 rounded-lg mb-4'><h2>{formik.errors.email}</h2> </div>)}
      <label htmlFor="password">Password:</label>
      <input id='password' type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' className='border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4' />
      {formik.errors.password && formik.touched.password&& (<div className=' bg-red-500 text-white p-3 rounded-lg mb-4'><h2>{formik.errors.password}</h2> </div>)}
      <label htmlFor="rePassword">Repassword:</label>
      <input id='rePassword' type="password" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} name='rePassword' className='border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4' />
      {formik.errors.rePassword&& formik.touched.rePassword&& (<div className=' bg-red-500 text-white p-3 rounded-lg mb-4'><h2>{formik.errors.rePassword}</h2> </div>)}
      <label htmlFor="phone">Phone:</label>
      <input id='phone' type="tel" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name='phone' className='border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4' />
      {formik.errors.phone && formik.touched.phone&& (<div className=' bg-red-500 text-white p-3 rounded-lg mb-4'><h2>{formik.errors.phone}</h2> </div>)}
      <button disabled={isLoading} type='submit' className='bg-green-300 hover:bg-green-400 px-4 py-3 rounded-lg text-white font-medium block ms-auto mt-4'>
        {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Register"}
        </button>
      
    </form>
    </div>
  )
}
