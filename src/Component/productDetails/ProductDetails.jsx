import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

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
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [btnLoading, setBtnLoading] = useState(false);
  const [ProductDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingItem, setLoadingItem] = useState({});
  const [wishData, setWishData] = useState([]);
  const { id, categoryId } = useParams();
  const { addProductToCart,setCartNum } = useContext(CartContext);
  const { addProductToWishList,removeProductfromWishList,getWishListProducts } = useContext(WishListContext);


  useEffect(() => {
    getProductDetails();
  }, [id]);
  useEffect(() => {
    getRelatedProducts();
  }, []);
  useEffect(() => {
    getWishedProducts();
  }, []);

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        setIsLoading(false);
        if (relatedProducts.length) {
          filterRelatedProducts(relatedProducts);
        }
      })
      .catch((err) => console.log(err));
      
  }
  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        filterRelatedProducts(data.data);
      })
      .catch((err) => console.log(err));
  }
  function filterRelatedProducts(data) {
    let res = data.filter(
      (product) => product.category._id == categoryId && product.id != id
    );
    setRelatedProducts(res);
  }
  async function addToCart(id) {
    setBtnLoading(true)
    setLoadingItem((prev) => ({ ...prev, [id]: true }));
    const res = await addProductToCart(id);
    setCartNum(res.data.numOfCartItems)          //update cart notification 
    setWishData(res.data.data)
    setBtnLoading(false)
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
  async function removeWishedProducts(id) {
    const res = await removeProductfromWishList(id);
    setWishData(res.data.data)
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
  async function getWishedProducts() {
    const res = await getWishListProducts();
    setWishData(res.data.data)
  }

  async function addToWishList(productId) {
    const res = await addProductToWishList(productId)
    setWishData(res.data.data)
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 items-center">
          <div className="w-[50%] mx-auto">
            <Slider {...settings}>
              {ProductDetails.images.map((src) => (
                <img
                  key={ProductDetails.id}
                  src={src}
                  alt={ProductDetails.title}
                  className="w-full"
                />
              ))}
            </Slider>
          </div>
          <div>
            <h2 className="text-3xl text-green-600 font-semibold mb-5">
              {ProductDetails.title}
            </h2>
            <p className="mb-5 text-lg">{ProductDetails.description}</p>
            <div className="flex items-center justify-between mb-5 text-lg">
              <span>{ProductDetails.price} EGP</span>
              <span>
                <i className="fa-solid fa-star rating-color me-1"></i>
                {ProductDetails.ratingsAverage}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 p-2">
              <button onClick={() => {addToCart(ProductDetails.id);}} className=" bg-green-500 w-[80%] rounded-lg py-2 text-white font-bold text-lg">
               {btnLoading? <i className="fa fa-spinner fa-spin"></i>: <span>+ Add To Cart </span>}
                </button>
              <i onClick={()=>wishData.some((data)=>data.id==ProductDetails.id||data==ProductDetails.id)?removeWishedProducts(ProductDetails.id):addToWishList(ProductDetails.id)} 
              className={`fa-solid fa-heart text-2xl cursor-pointer ${wishData.some((data)=>data.id==ProductDetails.id||data==ProductDetails.id)?"text-red-700":"text-black"}`}></i>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : relatedProducts.length ? (
        <div className="container mx-auto mt-16">
          <h2 className="text-4xl mb-4 text-green-600">Related Products :</h2>
          <div className="w-full">
            <Slider {...relatedSettings}>
              {relatedProducts?.map((product) => {
                return (
                  <div key={product.id} className="p-5">
                    <ProductItem 
                    loading={btnLoading} 
                    loadingItem={loadingItem} 
                    addCart={addToCart} 
                    addWishList={addToWishList} product={product}
                    wishedData={wishData}
                    removeWished={removeWishedProducts}
                     />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
