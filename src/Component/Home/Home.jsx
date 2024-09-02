import React from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import MainSlider from "../MainSlider/MainSlider";
import RecentCategories from "../RecentCategories/RecentCategories";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div>
      
            <Helmet>
                <title>Home</title>
            </Helmet>
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
