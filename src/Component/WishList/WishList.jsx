import React, { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishInfo, setWishInfo] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState({});
  const { addProductToCart,setCartNum } = useContext(CartContext);
  const { getWishListProducts } = useContext(WishListContext);
  useEffect(() => {
    getProducts();
  }, []);
  async function getProducts() {
    const res = await getWishListProducts();
    console.log(res);

    setWishInfo(res.data.data);
    setIsLoading(false);
  }
  async function addToCart(id) {
    setBtnLoading(true)
    setLoadingItem((prev) => ({ ...prev, [id]: true }));
    const res = await addProductToCart(id);
    setCartNum(res.data.numOfCartItems)          //update cart notification 
    setBtnLoading(false)
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
        <div>
          {/*  loader from removing , update item or clear*/}
          {/* {isRemoved ? (
            <div className="fixed z-50 right-0 left-0 bottom-0 top-0">
              <SubLoader />
            </div>
          ) : (
            <div className="hidden">
              <SubLoader />
            </div>
          )} */}
          {/* Cart products */}
          <div className="container w-[80%] mx-auto">
            <h2 className="text-5xl font-bold text-black text-center my-10">WishList </h2>
          {wishInfo.map((product) => (
            <div key={product.id} >
                <div className="flex flex-wrap border-b border-b-gray-300 py-4">
              <div className="w-full md:w-[20%] p-4">
                <img src={product.imageCover} className="w-full" alt="" />
              </div>

              <div className="flex justify-between items-center w-full md:w-[80%]">
                <div>
                  <h2 className=" text-lg mb-2">{product.title}</h2>
                  <h3 className="text-green-600 mb-2">{product.price} EGP</h3>
                  <button className="text-red-600">
                    <i className="fa fa-trash"></i> Remove
                  </button>
                </div>
                <div>
                  <button onClick={()=>addToCart(product.id)} className="btn bg-green-500 hover:bg-green-600  rounded-lg py-2 px-3 text-white font-bold text-lg">
                    +Add To Cart
                  </button>
                </div>
              </div>
                </div>
            </div>
          ))}
          </div>
        </div>
      )}
    </>
  );
}
