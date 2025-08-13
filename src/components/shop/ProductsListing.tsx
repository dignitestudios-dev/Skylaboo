import React from "react";
import Tabs from "../home/Tabs";
import ProductCard from "../common/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 123,
    image: "1.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "2.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "3.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "4.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "5.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "6.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },

  {
    id: 123,
    image: "7.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "8.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "9.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "10.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "1.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "2.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "3.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "4.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "5.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "6.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },

  {
    id: 123,
    image: "7.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "8.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "9.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
  {
    id: 123,
    image: "10.png",
    name: "Skylaboo Kids Shirt",
    price: "110.00",
  },
];

const tabs = ["All", "Tops", "Bottoms", "Shoes", "Accessories", "Toys"];

const ProductsListing = () => {
  const pages: number[] = [1, 2, 3, 4, 5];
  return (
    <section className="relative px-12 overflow-hidden">
      {/* Bg Glows */}
      <div className="absolute z-10 -left-[300px] -bottom-12 w-[1400px] h-[1000px] bg-[var(--color-yellow)]/20 rounded-full blur-[120px]" />
      <div className="absolute z-10 -right-[300px] -bottom-12 w-[1400px] h-[1000px] bg-[var(--color-purple)]/20 rounded-full blur-[120px]" />

      <div className="relative z-20">
        <Tabs tabs={tabs} defaultActive="All" />

        <div className="mt-6 grid grid-cols-5 gap-x-3 gap-y-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={{
                ...product,
                image: `/images/products/${product.image}`,
              }}
            />
          ))}
        </div>

        <div className="w-full flex justify-center items-center gap-3 my-10">
          <ChevronLeft color="#979797" />
          <div className="flex items-center rounded-full overflow-hidden">
            {pages.map((page, index) => (
              <div
                key={index}
                className={`w-12 h-10 flex justify-center items-center bg-[#fdede6] ${
                  index === 0 ? "bg-purple-gradient text-white" : ""
                }`}
              >
                {page}
              </div>
            ))}
          </div>
          <ChevronRight color="#FC92EF" />
        </div>
      </div>
    </section>
  );
};

export default ProductsListing;
