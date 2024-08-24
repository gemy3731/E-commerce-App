import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProduct() {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {addProductToCart}= useContext(CartContext)

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
      .catch(err => err);
  }
 async function addToCart(id) {
  const res = await addProductToCart(id);
  console.log(res);
  
  if (res.data?.status=="success") {
    toast.success(res.data.message,{
      position: 'right-bottom',
      style: {
        "backgroundColor":"black",
        "color":"white"
      },
    })
    
  }else{
    toast.error(res.response.data.message,{
      position: 'right-bottom',
      style: {
        "backgroundColor":"black",
        "color":"white"
      },
    })
  }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products?.splice(0, 20).map((product) => {
              return <ProductItem key={product.id} addCart={addToCart} product={product} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
