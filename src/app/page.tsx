import About from "@/components/home/About";
import Categories from "@/components/home/Categories";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import ShopNow from "@/components/home/ShopNow";
import WelcomeModal from "@/components/home/WelcomeModal";
import React from "react";

const Home = () => {
  return (
    <div>
      <WelcomeModal />
      <Hero />
      <NewArrivals />
      <Categories />
      <ShopNow />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
