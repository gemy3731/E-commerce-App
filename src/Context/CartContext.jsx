import axios from "axios";
import React, { createContext, useContext } from "react";
export const CartContext = createContext();
const headers = {
  token: window.localStorage.getItem("token"),
};
// Add products to cart 
function addProductToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
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
export default function CartContextProvider({ children }) {
  return (
    <CartContext.Provider value={{ addProductToCart,getCartProducts,removeCartProduct,updateCartProduct }}>
      {children}
    </CartContext.Provider>
  );
}
