import axios from "axios";
import { createContext, useContext } from "react";
import { UserTokenContext } from "./UserTokenContext";
export const WishListContext = createContext();
 
export default function WishListContextProvider({ children }) {
  const {token} = useContext(UserTokenContext)
  const headers = {
    token
  };
  function addProductToWishList(productId) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId},{headers})
    .then((res) => res)
    .catch((err) => err);
  }
  function getWishListProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{headers})
    .then((res) => res)
    .catch((err) =>err);
  }
  function removeProductfromWishList(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
    .then((res) => res)
    .catch((err) => err);
  }
    return (
      <WishListContext.Provider value={{ addProductToWishList,getWishListProducts,removeProductfromWishList }}>
        {children}
      </WishListContext.Provider>
    );
  }