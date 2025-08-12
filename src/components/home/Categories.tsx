import React from "react";
import CategoryCard from "./CategoryCard";
import YellowGlow from "../common/YellowGlow";

const Categories = () => {
  return (
    <section className="relative">
      {/* Bg Glows */}
      <div className="absolute z-10 -left-[300px] top-1/6 w-[805px] h-[655px] bg-[var(--color-yellow)]/40 rounded-full blur-3xl" />
      <div className="absolute z-10 -right-[300px] top-1/6 w-[805px] h-[655px] bg-[var(--color-purple)]/40 rounded-full blur-3xl" />

      <div className="p-12 pt-0 relative z-20 h-[750px]">
        <div className="grid grid-cols-3 gap-3 h-full">
          <div className="h-full grid grid-cols-1 gap-3">
            <CategoryCard title="Boys" image="1.png" />
            <CategoryCard title="Girls" image="2.png" />
          </div>
          <CategoryCard title="Toys" image="3.png" />
          <div className="h-full grid grid-cols-1 gap-3">
            <CategoryCard title="Shoes" image="4.png" />
            <CategoryCard title="Accessories" image="5.png" />
          </div>
        </div>
      </div>


    </section>
  );
};

export default Categories;
