import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";

export default function ProductDetails() {
  const [ProductDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id, categoryId } = useParams();

  useEffect(() => {
    getProductDetails();
  }, [id]);
  useEffect(() => {
    getRelatedProducts();
  }, []);
  
  
  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        setIsLoading(false);
        if (relatedProducts.length) {
          filterRelatedProducts(relatedProducts)
        }
      })
      .catch((err) => console.log(err));
  }
  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        filterRelatedProducts(data.data)
      })
      .catch((err) => console.log(err));
  }
  function filterRelatedProducts(data) {
    let res = data.filter((product)=>product.category._id==categoryId&&product.id!=id)
    setRelatedProducts(res);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 items-center">
          <div className="w-[50%] mx-auto">
            <img
              src={ProductDetails.imageCover}
              alt={ProductDetails.title}
              className="w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-5">
              {ProductDetails.title}
            </h2>
            <p className="mb-5">{ProductDetails.description}</p>
            <div className="flex items-center justify-between mb-5">
              <span>{ProductDetails.price} EGP</span>
              <span>
                <i className="fa-solid fa-star rating-color me-1"></i>
                {ProductDetails.ratingsAverage}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 p-2">
              <button className=" bg-green-500 w-[80%] rounded-lg py-2 text-white font-bold">
                + Add to cart
              </button>
              <i className="fa-solid fa-heart text-2xl"></i>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) :relatedProducts.length? (
        <div className="container mx-auto mt-16">
          <h2 className="text-4xl mb-4 text-green-500">Related Products :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts?.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </div>
      </div>
      ):""}
    </>
  );
}
