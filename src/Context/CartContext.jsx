import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { UserTokenContext } from "./UserTokenContext";
export const CartContext = createContext();



export default function CartContextProvider({ children }) {
  const [cartId, setCartId] = useState(null)
  const [cartNum, setCartNum] = useState(null)
  const {token} = useContext(UserTokenContext)
  const headers = {
    token
  };
  // Add products to cart
  function addProductToCart(productId) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  // Display products in cart 
function getCartProducts() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers})
    .then((res) => res)
    .catch((err) => err);
}
  // remove product from cart
function removeCartProduct(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
    .then((res) => res)
    .catch((err) => err);
}
function updateCartProduct(id , count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers})
    .then((res) => res)
    .catch((err) => err);
}
function clearCart() {
  return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{headers})
    .then((res) => res)
    .catch((err) => err);
}
function createCashOrder(values,url) {
  return axios.post(url,{values},{headers})
  .then((res) =>res)
  .catch((err) =>err);
}
function getUserOrders(userId) {

  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  .then((res)=>res)
  .catch((err) => err);
}
  return (
    <CartContext.Provider value={{ addProductToCart,getCartProducts,removeCartProduct,updateCartProduct,clearCart,cartId, setCartId,cartNum, setCartNum,createCashOrder,getUserOrders }}>
      {children}
    </CartContext.Provider>
  );
}
