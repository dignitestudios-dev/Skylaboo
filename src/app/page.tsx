"use client";
import PageLoader from "@/components/common/PageLoader";
import About from "@/components/home/About";
import Categories from "@/components/home/Categories";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import ShopNow from "@/components/home/ShopNow";
import WelcomeModal from "@/components/home/WelcomeModal";
import { categoryHooks } from "@/hooks/categories/CategoriesHooks";
import { productHooks } from "@/hooks/products/ProductHooks";
import React, { useEffect } from "react";

const isBrowser = typeof window !== "undefined";

const Home = () => {
  useEffect(() => {
    if (isBrowser) {
      localStorage.removeItem("orderData");
    }
  }, []);

  return (
    <>

      <div>
        <WelcomeModal />
        <Hero />
        <div className="overflow-hidden">
          <NewArrivals />
          <Categories />
          <ShopNow />
        </div>
        <About />
        <Contact />
      </div>
    </>
  );
};

export default Home;
