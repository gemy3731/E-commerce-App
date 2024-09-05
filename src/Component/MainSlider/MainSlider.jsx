import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import sliderimg1 from "../../assets/images/slider-image-1.jpeg";
import sliderimg2 from "../../assets/images/slider-image-2.jpeg";
import sliderimg3 from "../../assets/images/slider-image-3.jpeg";
export default function MainSlider() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  return (
    <div>
      <div className="slider-container ">
        <div className="flex flex-wrap">
          <div className="w-3/4 pe-1">
            <Slider arrows={false} asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
              <div>
                <img
                  src={sliderimg1}
                  className="w-full h-[500px]"
                  alt={sliderimg1}
                />
              </div>
              <div>
                <img
                  src={sliderimg2}
                  className="w-full h-[500px]"
                  alt={sliderimg2}
                />
              </div>
              <div>
                <img
                  src={sliderimg3}
                  className="w-full h-[500px]"
                  alt={sliderimg3}
                />
              </div>
            </Slider>
          </div>
          <div className="w-1/4 h-full">
            <Slider
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={2}
              vertical={true}
              initialSlide={1}
              swipeToSlide={true}
              focusOnSelect={true}
              touchMove={false}
            >
              <div>
                <img
                  src={sliderimg1}
                  className="w-full h-[248px]"
                  alt={sliderimg1}
                />
              </div>
              <div>
                <img
                  src={sliderimg2}
                  className="w-full h-[248px]"
                  alt={sliderimg2}
                />
              </div>
              <div>
                <img
                  src={sliderimg3}
                  className="w-full h-[248px]"
                  alt={sliderimg3}
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
