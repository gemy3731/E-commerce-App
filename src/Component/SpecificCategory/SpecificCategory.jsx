import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import Products from './../Products/Products';
import { UserTokenContext } from "../../Context/UserTokenContext";

export default function SpecificCategory() {
  const [isLoading, setIsLoading] = useState(true);
  const [getData, setGetData] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState({});
  const [wishData, setWishData] = useState([]);
  const { addProductToCart, setCartNum } = useContext(CartContext);
  const { token } = useContext(UserTokenContext);

  const {
    addProductToWishList,
    removeProductfromWishList,
    getWishListProducts,
  } = useContext(WishListContext);
  const { categoryId } = useParams();
  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
   if(token) getWishedProducts();
  }, [token]);


  function getAllProducts() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/products?")
      .then((res) => {
        filterData(categoryId, res.data.data);
        setIsLoading(false);
      });
  }
  function filterData(categoryId, data) {
    const res = data?.filter((product) => product.category._id == categoryId);
    setGetData(res);
  }

  async function addToCart(id) {
    setBtnLoading(true);
    setLoadingItem((prev) => ({ ...prev, [id]: true }));
    let res = await addProductToCart(id);
    setCartNum(res.data.numOfCartItems); //update cart notification
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
    setWishData(res.data.data);
  }
  async function removeWishedProducts(id) {
    const res = await removeProductfromWishList(id);
    setWishData(res.data.data);
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
    const res = await addProductToWishList(productId);
    setWishData(res.data.data);
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
            {getData.map((product) => {
              return (
                <div key={product.id}>
                  <Helmet>
                    <title>{product.category.name}</title>
                  </Helmet>
                  <ProductItem
                    addCart={addToCart}
                    loading={btnLoading}
                    product={product}
                    loadingItem={loadingItem}
                    addWishList={addToWishList}
                    wishedData={wishData}
                    removeWished={removeWishedProducts}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
