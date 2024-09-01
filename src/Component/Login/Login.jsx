
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { UserTokenContext } from '../../Context/UserTokenContext';

export default function Login() {
  const [apiError,setApiError] = useState(null)
  const [isLoading ,setIsLoading] = useState(false);
  const navigate = useNavigate()
  const userToken = useContext(UserTokenContext)
  const {userId,decodeToken} = useContext(UserTokenContext)

  const initialValues = {
    email:"",
    password:"",
  }
  const onSubmit = (value)=>{
    setApiError(null);
    setIsLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",value)
    .then((res)=>{
      localStorage.setItem("token",res.data.token);
      userToken.setToken(res.data.token)
      navigate("/home")
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
      email:yup.string().required("Email required").email("Enter invalid email"),
      password:yup.string().required("Password required").matches(/^[A-Z][a-z0-9]{5,}$/),
    })
  })
  return (
    <div className='p-10 w-[75%] mx-auto'>
    <h2 className='text-4xl mb-4'>Login Now :</h2>
    
    {apiError&& <div className=' bg-red-500 text-white p-3 rounded-lg mb-4'><h2 >{apiError}</h2></div>}
    <form onSubmit={formik.handleSubmit} >
      <label htmlFor="email">Email:</label>
      <input id='email' type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' className='border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4' />
      {formik.errors.email && formik.touched.email&& (<div className=' bg-red-700 text-white p-3 font-medium rounded-lg mb-4'><h2>{formik.errors.email}</h2> </div>)}
      <label htmlFor="password">Password:</label>
      <input id='password' type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' className='border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4' />
      {formik.errors.password && formik.touched.password&& (<div className=' bg-red-700 font-medium text-white p-3 rounded-lg mb-4'><h2>{formik.errors.password}</h2> </div>)}
      <button disabled={isLoading} type='submit' className='bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg text-white font-semibold block ms-auto mt-4'>
        {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Login"}
        </button>
    </form>
    </div>
  )
}
