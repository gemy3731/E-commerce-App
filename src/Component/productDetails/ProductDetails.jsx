import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";
import Slider from "react-slick";

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };
  var relatedSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };
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
          <Slider {...settings}>
            {ProductDetails.images.map((src)=> <img key={ProductDetails.id} src={src} alt={ProductDetails.title} className="w-full" />)}
         </Slider>
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
        <div className="w-full mx-auto">
        <Slider {...relatedSettings}>

          {relatedProducts?.map((product) => {
            return <div className="p-5"><ProductItem key={product.id} product={product} /></div>;
          })}
        </Slider>
        </div>
      </div>
      ):""}
    </>
  );
}
