import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";
import { Helmet } from "react-helmet";

export default function Products() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState({});
  const [count, setCount] = useState(1)
  const [productData, setProductData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [pageNum, setPageNum] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [wishData, setWishData] = useState([]);
  const { addProductToWishList,removeProductfromWishList,getWishListProducts } = useContext(WishListContext);
  const { addProductToCart, setCartNum } = useContext(CartContext);
  // Display  products in Products page
  useEffect(()=>{
    getAllProducts()
  },[count])
  useEffect(()=>{
    getWishedProducts()
  },[])
  function getAllProducts() {
    setIsLoading(true)
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${count}`).then(({data})=>{
      setProductData(data.data)
      setFilteredData(data.data)
      setPageNum(data.metadata)
      setIsLoading(false)
    })
  }
  function searchByproductName({target}) {
    const searchItem = target.value.toLowerCase();
    if (searchItem==="") {
      setFilteredData(productData);
    }else{
      const filtered = productData.filter((product)=>product.title.toLowerCase().includes(searchItem))
      setFilteredData(filtered)
    }
  }
  async function addToCart(id) {
    setBtnLoading(true);
    setLoadingItem((prev) => ({ ...prev, [id]: true }));
    let res = await addProductToCart(id);
    setCartNum(res.data.numOfCartItems);            //update cart notification
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
    setWishData(res.data.data)
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
          <Helmet>
                <title>Products</title>
            </Helmet>
            <div className="relative mb-10 ">
          <input
            id="search"
            type="search"
            placeholder=" "
            onInput={searchByproductName}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label
            htmlFor="search"
            className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Search
          </label>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredData.map((product) => {
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
          <nav className="mx-auto w-fit mt-16" aria-label="Page navigation example ">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button
                  onClick={()=>setCount(pageNum?.prevPage)}
                  disabled={pageNum.currentPage==1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-900 bg-white border border-e-0 border-gray-400 rounded-s-lg hover:bg-gray-300 hover:text-gray-700 text-lg font-bold"
                >
                  
                  Previous
                </button>
              </li>
              <li>
                <button
                  onClick={()=>setCount(1)}
                  disabled={pageNum.currentPage==1}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white border border-gray-400 hover:bg-gray-300 hover:text-gray-700 text-lg font-bold"
                >
                  1
                </button>
              </li>
              <li>
                <button
                  onClick={()=>setCount(2)}
                  disabled={pageNum.currentPage==2}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white border border-gray-400 hover:bg-gray-300 hover:text-gray-700 text-lg font-bold"
                >
                  2
                </button>
              </li>
              <li>
                <button
                  onClick={()=>setCount(pageNum?.nextPage)}
                  disabled={pageNum.currentPage==2}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white border border-gray-400 rounded-e-lg hover:bg-gray-300 hover:text-gray-700 text-lg font-bold">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}





