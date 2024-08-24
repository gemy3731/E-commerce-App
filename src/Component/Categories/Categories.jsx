import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function Categories() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
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
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);
  function getAllCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id}>
            <img
              
              src={category.image}
              alt={category.name}
              className="w-full h-[300px]"
            />
            <h2>{category.name}</h2>
          </div>
        ))}
      </Slider>
    </div>
  );
}
