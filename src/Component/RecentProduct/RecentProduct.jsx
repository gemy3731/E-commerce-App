import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function RecentProduct() {
  const [btnLoading, setBtnLoading] = useState(false);
  const { addProductToCart } = useContext(CartContext);

  function getAllProducts() {
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/products?limit=20"
    );
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recentData"],
    queryFn: getAllProducts,
    select: (data) => data.data.data,
  });

  async function addToCart(id) {
    setBtnLoading(true);

    let res = await addProductToCart(id);
    setBtnLoading(false);
    if (res.data?.status == "success") {
      toast.success(res.data.message, {
        position: "right-bottom",
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      toast.error(res.response.data.message, {
        position: "right-bottom",
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  addCart={addToCart}
                  loading={btnLoading}
                  product={product}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
