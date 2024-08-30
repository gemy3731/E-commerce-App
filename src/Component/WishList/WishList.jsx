import React, { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import SubLoader from "../SubLoader/SubLoader";

export default function WishList() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishInfo, setWishInfo] = useState([]);
  const [isRemoved, setIsRemoved] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState({});
  const { addProductToCart, setCartNum } = useContext(CartContext);
  const { getWishListProducts, removeProductfromWishList } = useContext(WishListContext);
  useEffect(() => {
    getProducts();
  }, []);
  async function getProducts() {
    const res = await getWishListProducts();
    setWishInfo(res.data.data);
    setIsLoading(false);
  }
  async function addToCart(id) {
    setBtnLoading(true);
    setLoadingItem((prev) => ({ ...prev, [id]: true }));
    const res = await addProductToCart(id);
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
  async function removeFromWishList(id) {
    setIsRemoved(true);
    const { data } = await removeProductfromWishList(id);
    setWishInfo((prev) => prev.filter((ele) => ele.id != id));
    setIsRemoved(false);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* loader from removing , update item or clear*/}
          {isRemoved ? (
            <div className="fixed z-50 right-0 left-0 bottom-0 top-0">
              <SubLoader />
            </div>
          ) : (
            <div className="hidden">
              <SubLoader />
            </div>
          )}
          {/* Cart products */}
          <div className="container w-[80%] mx-auto">
            <h2 className="text-5xl font-bold text-black text-center my-10">
              WishList{" "}
            </h2>
            {wishInfo.map((product) => (
              <div key={product.id}>
                <div className="flex flex-wrap border-b border-b-gray-300 py-4">
                  <div className="w-full md:w-[20%] p-4">
                    <img src={product.imageCover} className="w-full" alt="" />
                  </div>

                  <div className="flex justify-between items-center w-full md:w-[80%]">
                    <div>
                      <h2 className=" text-lg mb-2">{product.title}</h2>
                      <h3 className="text-green-600 mb-2">
                        {product.price} EGP
                      </h3>
                      <button
                        onClick={() => removeFromWishList(product.id)}
                        className="text-red-600 space-x-2"
                      >
                        <i className="fa fa-trash"></i>
                        <span>Remove</span>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="btn bg-green-500 hover:bg-green-600  rounded-lg py-2 px-3 text-white font-bold text-lg"
                      >
                        {btnLoading && loadingItem[product.id] ? (
                          <i className="fa fa-spinner fa-spin"></i>
                        ) : (
                          <span>+ Add To Cart</span>
                        )}
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
