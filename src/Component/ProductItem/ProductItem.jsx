import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductItem({ product, addCart, loading,loadingItem,addWishList,wishedData,removeWished }) {
  return (
    <div className="product rounded-lg overflow-hidden">
      <Link to={`/productdetails/${product.id}/${product.category._id}`}>
        <img src={product.imageCover} className="w-full" alt={product.title} />
        <div className="p-2 ">
          <h2 className="text-[#4fa74f] text-lg ">{product.category.name}</h2>
          <h2 className="font-bold my-2 text-lg">
            {product.title.split(" ").splice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between items-center text-lg">
            <span>{product.price} EGP</span>
            <span>
              <i className="fa-solid fa-star rating-color me-1"></i>
              {product.ratingsAverage}
            </span>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-2 p-2">
        <button
          onClick={() => {
            addCart(product.id);
          }}
          className="btn bg-green-500 w-[80%] rounded-lg py-2 text-white font-bold text-lg"
        >
          {loading && loadingItem[product.id] ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            <span>+ Add To Cart</span>
          )}
        </button>
        <i onClick={()=>{
          wishedData.some((data)=>data.id==product.id||data==product.id)?removeWished(product.id):addWishList(product.id);}}
           className={`fa-solid fa-heart text-2xl cursor-pointer ${wishedData.some((data)=>data.id==product.id||data==product.id)?"text-red-700":"text-black"}`}></i>
      </div>
    </div>
  );
}
