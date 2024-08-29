import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Products() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState({});
  const [count, setCount] = useState(1)
  const [productData, setProductData] = useState([])
  const [pageNum, setPageNum] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { addProductToCart, setCartNum } = useContext(CartContext);
  // Display  products in Products page
  useEffect(()=>{
    getAllProducts()
  },[count])
  function getAllProducts() {
    console.log(count);
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${count}`).then(({data})=>{
      setProductData(data.data)
      setPageNum(data.metadata)

      setIsLoading(false)
      console.log(data);
      console.log(pageNum);
      
    })
  }
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["recentData"],
  //   queryFn: getAllProducts,
  //   // staleTime:10*60*1000,
  //   select: (data) => data.data,
  // });

  // console.log(count);
  

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
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productData.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  addCart={addToCart}
                  loading={btnLoading}
                  product={product}
                  loadingItem={loadingItem}
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





