import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { WishListContext } from "../../Context/WishListContext";
import { UserTokenContext } from "../../Context/UserTokenContext";

export default function RecentProduct() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState({});
  const [wishData, setWishData] = useState([]);
  const { addProductToCart,setCartNum } = useContext(CartContext);
  const { addProductToWishList,removeProductfromWishList,getWishListProducts } = useContext(WishListContext);
  const {token,setToken} = useContext(UserTokenContext);
useEffect(()=>{
 if(token) getWishedProducts()
},[token])
// Display 20 products in home page 
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
// Add products to cart
  async function addToCart(id) {
    setBtnLoading(true);
    setLoadingItem((prev) => ({ ...prev, [id]: true }));
      let res = await addProductToCart(id);
      setCartNum(res.data.numOfCartItems)          //update cart notification 
      setBtnLoading(false);
      setLoadingItem((prev) => ({ ...prev, [id]: false }));
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
  async function getWishedProducts() {
    const res = await getWishListProducts();
    if(token) setWishData(res.data.data)
  }
  async function removeWishedProducts(id) {
    const res = await removeProductfromWishList(id);
    setWishData(res.data.data)
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
  async function addToWishList(productId) {
    const res = await addProductToWishList(productId)
    setWishData(res.data.data)
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
                  loadingItem={loadingItem}
                  addWishList={addToWishList}
                  wishedData={wishData}
                  removeWished={removeWishedProducts}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
