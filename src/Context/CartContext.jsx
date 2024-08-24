import axios from 'axios';
import React, { createContext, useContext } from 'react'
import { UserTokenContext } from './UserTokenContext';
export const CartContext = createContext();
const headers = {
   token :localStorage.getItem("token")
}
function addProductToCart(productId) {
    console.log(productId);
    
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {productId},
        {headers}).then(res=>res).catch(err=>err);
 }
export default function CartContextProvider({children}) {
    const {token}= useContext(UserTokenContext)
    

  return (
    <CartContext.Provider value={{addProductToCart}}>
        {children}
    </CartContext.Provider>
  )
}
