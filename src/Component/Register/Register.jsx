import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const onSubmit = (value) => {
    setApiError(null);
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)
      .then((res) => {
        navigate("/login");
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err.response.data.message);
        setTimeout(() => setApiError(null), 5000);
        setIsLoading(false);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name required")
        .min(3, "Minimum name length is 3 characters")
        .max(15, "Maxmum name length is 15 characters"),
      email: yup
        .string()
        .required("Email required")
        .email("Enter invalid email"),
      password: yup
        .string()
        .required("Password required")
        .matches(/^[A-Z][a-z0-9]{5,}$/),
      rePassword: yup
        .string()
        .required("Repassword required")
        .oneOf([yup.ref("password")], "Repassword should match password"),
      phone: yup
        .string()
        .required("Phone required")
        .matches(/^01[0125][0-9]{8}$/),
    }),
  });
  return (
    <div className="p-10 w-[75%] mx-auto">
      <h2 className="text-4xl font-semibold text-center mb-6">Register Now</h2>
      {apiError && (
        <div className=" bg-red-500 text-white p-3 rounded-lg mb-4">
          <h2>{apiError}</h2>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="relative mb-2">
          <input
            id="name"
            type="text"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="name"
            placeholder=" "
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label 
          htmlFor="name"
          className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Name:
          </label>
        </div>
        {formik.errors.name && formik.touched.name && (
          <div className=" bg-red-700 font-medium text-white p-3 rounded-lg mb-4">
            <h2>{formik.errors.name}</h2>
          </div>
        )}
        <div className="relative mb-2">
        <input
          id="email"
          type="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="email"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label 
          htmlFor="email"
          className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Email:</label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className=" bg-red-700 font-medium text-white p-3 rounded-lg mb-4">
            <h2>{formik.errors.email}</h2>{" "}
          </div>
        )}
        <div className="relative mb-2">
        <input
          id="password"
          type="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="password"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
        />
        <label 
        htmlFor="password"
        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Password:</label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className=" bg-red-700 font-medium text-white p-3 rounded-lg mb-4">
            <h2>{formik.errors.password}</h2>{" "}
          </div>
        )}
        <div className="relative mb-2">
        <input
          id="rePassword"
          type="password"
          value={formik.values.rePassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="rePassword"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
        />
        <label 
        htmlFor="rePassword"
        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Repassword:</label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className=" bg-red-700 font-medium text-white p-3 rounded-lg mb-4">
            <h2>{formik.errors.rePassword}</h2>{" "}
          </div>
        )}
        <div className="relative mb-2">
        <input
          id="phone"
          type="tel"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="phone"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
        />
        <label 
        htmlFor="phone"
        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Phone:</label>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div className=" bg-red-700 font-medium text-white p-3 rounded-lg mb-4">
            <h2>{formik.errors.phone}</h2>{" "}
          </div>
        )}
        <h3 className="mt-4">Have an account? <Link to={"/login"} className="text-green-500 hover:text-green-500 font-semibold ">Log in</Link></h3>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg text-white font-semibold block ms-auto mt-4"
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
    </div>
  );
}
