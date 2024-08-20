import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";

export default function RecentProduct() {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllProducts();
  }, []);
  function getAllProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
    {isLoading? <Loader />:
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products?.splice(0, 20).map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </div>
      </div>
    }
    </>
  );
}
