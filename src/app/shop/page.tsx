import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import ProductsListing from "@/components/shop/ProductsListing";
import ShopHero from "@/components/shop/ShopHero";
import React from "react";

const Shop = () => {
  return (
    <>
      {/* Common navigation bar */}
      <Navbar />
      <div>
        <ShopHero />
        <ProductsListing />
      </div>
      {/* Common footer */}
      <Footer />
    </>
  );
};

export default Shop;
