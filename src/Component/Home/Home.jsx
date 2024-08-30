import React from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import MainSlider from "../MainSlider/MainSlider";
import RecentCategories from "../RecentCategories/RecentCategories";

export default function Home() {
  return (
    <div>
      <div className="mb-10">
        <MainSlider />
      </div>
      <div className="mb-16">
        <RecentCategories />
      </div>
      <RecentProduct />
    </div>
  );
}
