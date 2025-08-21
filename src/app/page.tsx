import PageLoader from "@/components/common/PageLoader";
import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import About from "@/components/home/About";
import Categories from "@/components/home/Categories";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import ShopNow from "@/components/home/ShopNow";
import WelcomeModal from "@/components/home/WelcomeModal";
import { categoryHooks } from "@/hooks/categories/CategoriesHooks";
import { productHooks } from "@/hooks/products/ProductHooks";
import React from "react";

const Home = () => {
  return (
    <>
      {/* Common navigation bar */}
      <Navbar />

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

      {/* Common footer */}
      <Footer />
    </>
  );
};

export default Home;
