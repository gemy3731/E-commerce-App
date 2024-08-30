// import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";


export default function Categories() {

      function getAllCategories() {
      return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      }
      const {data,isLoading} = useQuery({
        queryKey:["allCategories"],
        queryFn:getAllCategories,
        staleTime:1000*60*10,
        select:(data)=>data?.data?.data
      });
      console.log(data)
  return (
    <>
    {isLoading?<Loader />:(
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {console.log(data)}
      {data.map((category)=><div key={category._id} className="product rounded-lg overflow-hidden">
      <Link to={`/specificCategory/${category._id}`}>
        <img src={category.image} className="w-full h-[450px]" alt={category.name} />
        <div className="p-2 text-center">
          <h2 className="text-[#4fa74f] text-2xl ">{category.name}</h2>
        </div>
      </Link>
      {console.log(data)}
      
    </div>)}
    </div>
    )}
    </>
  );
}
