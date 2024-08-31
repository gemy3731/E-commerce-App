import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import SubLoader from "../SubLoader/SubLoader";
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartInfo, setCartInfo] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);
const navigate = useNavigate()
  const { getCartProducts, removeCartProduct, updateCartProduct,clearCart,cartNum, setCartNum } = useContext(CartContext);
  useEffect(() => {
    getProducts();
  }, []);
  function navigateToCheckout(cartId) {
    if (cartInfo==="Your Cart Is Empty") return
    navigate(`/checkout/${cartId}`)
  }
// Display products in cart 
  async function getProducts() {
    const { data } = await getCartProducts();
    setCartInfo(data);
    setCartId(data.cartId)
    console.log(data.cartId);
    
    setCartNum(data.numOfCartItems)          //update cart notification 
    console.log(data);
    
    if (data.numOfCartItems==0) {
      setCartInfo("Your Cart Is Empty")
    }
    setIsLoading(false);
  }
  // remove product from cart
  async function removeProducts(id) {
    if (cartInfo==="Your Cart Is Empty") return
    setIsRemoved(true);                      //subLoader that display when user remove product in cart
    const res = await removeCartProduct(id);
    setCartInfo(res.data);                   // display products after user removed product
    setIsRemoved(false);                 //subLoader that display when user remove product in cart
    setCartNum(res.data.numOfCartItems)          //update cart notification 
  }
    // Update product in cart
  async function updateProduct(id , count) {
    if(count==0) return
    setIsRemoved(true);                  //subLoader that display when user update product in cart
    const res = await updateCartProduct(id,count)
    setCartInfo(res.data);               // display products after user update product quantity
    setIsRemoved(false);               //subLoader that display when user update product in cart
  }
  async function clearAllCart() {
    setIsRemoved(true);              //subLoader that display when user clear cart
    const res = await clearCart()
    setCartInfo("Your Cart Is Empty");            // display msg after user clear cart
    setIsRemoved(false);              //subLoader that display when user clear cart
    setCartNum(res.data.numOfCartItems)          //update cart notification 
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/*  loader from removing , update item or clear*/}
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
          <h2 className="text-5xl font-bold text-black text-center mb-16">
            Shipping Cart
          </h2>
          <div className="flex flex-col md:flex-row justify-between px-16 text-black text-2xl font-semibold my-8 w-[75%] mx-auto">
            <span>Total Number Of Products : {cartInfo?.numOfCartItems}</span>
            <span>Total Price : {cartInfo?.data?.totalCartPrice} {cartInfo?.data?.totalCartPrice?"EGP":""}</span>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg px-12">
            <table className="w-full text-sm text-center rtl:text-right text-gray-500  ">
              <thead className="text-2xl text-black bg-gray-50 border-b border-b-gray-300 ">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Price per product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartInfo?.data?.products?.map((ele) => {
                  return (
                    <tr
                      key={ele.product._id}
                      className="bg-white border-b border-b-gray-300 product"
                    >
                      <td className="p-4 ">
                        <img
                          src={ele.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={ele.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-black ">
                        {ele.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            disabled={ele.count==1}
                            onClick={()=>{updateProduct(ele.product._id,ele.count - 1)}}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-black bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200      "
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span>{ele.count}</span>
                          </div>
                          <button
                            onClick={()=>{updateProduct(ele.product._id,ele.count+1)}}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-black bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200      "
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-black ">
                        {ele.price} EGP
                      </td>
                      <td className="px-6 py-4 font-semibold text-black ">
                        {ele.price*ele.count} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            removeProducts(ele.product._id);
                          }}
                          className="font-medium text-white py-2 px-3 rounded-lg bg-red-500 hover:bg-red-800 "
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              
            </table>
            {cartInfo==="Your Cart Is Empty"?<p className="text-center text-green-700 font-medium text-2xl my-16">Your Cart Is Empty</p>:null}
            <div className="mt-5 flex flex-wrap gap-y-3 ">
            <button disabled={cartInfo==="Your Cart Is Empty"} onClick={()=>navigateToCheckout(cartId)}  className="border border-green-500   w-full lg:w-[70%] py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold">CheckOut</button>
            <button disabled={cartInfo==="Your Cart Is Empty"} onClick={clearAllCart} className=" text-white bg-red-500  w-1/4 mx-auto py-2 px-4 rounded-lg hover:bg-red-800 font-semibold">Clear Cart</button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
