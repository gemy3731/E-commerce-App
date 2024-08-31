import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import toast from "react-hot-toast";


export default function Checkout() {
  const [isLoading ,setIsLoading] = useState(false);
  const [isOnlinePayment ,setIsOnlinePayment] = useState(false);
  const [errorMsg ,setErrorMsg] = useState("");

  const {createCashOrder} = useContext(CartContext)
  const {cartId} = useParams()
  const navigate = useNavigate()
  
 async function pay(values) {
  setIsLoading(true)
  let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
  if (isOnlinePayment) {
    url=`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
  }
   const {data} = await createCashOrder(values,url)
   setIsLoading(false)
   console.log(data,"data");
   if (data?.status == "success") {
    if (isOnlinePayment) {
      window.location.href=data.session.url
    }else{
      navigate("/allOrders")
    }
   }else{
    toast.error("There is no cart", {
      position: "top-center",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
    setTimeout(()=>{
      navigate("/products")
    },3000)
  }
 }
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: pay,
    validationSchema:yup.object().shape({
      details : yup.string().required("Details are required"),
      phone : yup.string().required("Phone are required"),
      city : yup.string().required("City are required")
    })
  });
  return (
    <div>
      <form className="p-20" onSubmit={formik.handleSubmit}>
        
        <div className="relative mb-4">
          <input
            type="text"
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="details"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Details
          </label>
        </div>
          {formik.errors.details&&formik.touched.details&&<div className=' bg-red-700 font-medium text-white p-3 rounded-lg mb-4'><h2>{formik.errors.details}</h2> </div>}
        <div className="relative mb-4">
          <input
            type="tel"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Phone
          </label>
        </div>
          {formik.errors.phone&&formik.touched.phone&&<div className=' bg-red-700 font-medium text-white p-3 rounded-lg mb-4'><h2>{formik.errors.phone}</h2> </div>}
        <div className="relative mb-4">
          <input
            type="text"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="city"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            City
          </label>
        </div>
          {formik.errors.city&&formik.touched.city&&<div className=' bg-red-700 font-medium text-white p-3 rounded-lg mb-4'><h2>{formik.errors.city}</h2> </div>}
          <input className="me-2 accent-green-500" id="onlinePay" type="checkbox" onChange={()=>setIsOnlinePayment(!isOnlinePayment)} />
          <label className="text-[18px]" htmlFor="onlinePay">Pay Online</label>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg  text-lg font-medium block ms-auto mt-4"
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> :isOnlinePayment?"Pay Online" :"COD"}
        </button>
      </form>
    </div>
  );
}
