import axios from "axios";
import { createContext } from "react";
export const WishListContext = createContext();
const headers = {
    token: window.localStorage.getItem("token"),
  };
  function addProductToWishList(productId) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId},{headers})
    .then((res)=>res).catch((err)=>err)
  }
  function getWishListProducts(productId) {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{headers})
    .then((res)=>res).catch((err)=>err)
  }
export default function WishListContextProvider({ children }) {

    return (
      <WishListContext.Provider value={{ addProductToWishList,getWishListProducts }}>
        {children}
      </WishListContext.Provider>
    );
  }