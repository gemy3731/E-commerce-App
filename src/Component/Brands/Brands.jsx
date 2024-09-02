import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getAllBrand() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrand,
    staleTime: 1000 * 60 * 10,
    select: (data) => data.data.data,
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <Helmet>
            <title>Brands</title>
          </Helmet>
          {data.map((brand) => (
            <div
              key={brand._id}
              className="product border border-gray-400 rounded-lg overflow-hidden"
            >
              <Link to={`/specificBrand/${brand._id}`}>
                <img
                  src={brand.image}
                  className="w-full h-[350px]"
                  alt={brand.name}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
