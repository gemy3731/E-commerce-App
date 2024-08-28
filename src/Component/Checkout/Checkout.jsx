import { useFormik } from "formik";
import React from "react";

export default function Checkout() {
  function pay() {
    console.log("hello");
  }
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: pay,
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">details:</label>
        <input
          id="details"
          type="text"
          value={formik.values.details}
          onChange={formik.handleChange}
          name="details"
          className="border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4"/>
        <label htmlFor="phone">phone:</label>
        <input
          id="phone"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          name="phone"
          className="border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4"/>
        <label htmlFor="city">city:</label>
        <input
          id="city"
          type="text"
          value={formik.values.city}
          onChange={formik.handleChange}
          name="city"
          className="border border-gray-300 px-3 py-2 w-full rounded-lg outline-none mb-4"/>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-green-300 hover:bg-green-400 px-4 py-3 rounded-lg text-white font-medium block ms-auto mt-4">
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
        </button>
      </form>
    </div>
  );
}
