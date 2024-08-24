import React from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import Categories from "./../Categories/Categories";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  return (
    <div>
      <div className="mb-10">
        <MainSlider />
      </div>
      <div className="mb-16">
        <Categories />
      </div>
      <RecentProduct />
    </div>
  );
}
