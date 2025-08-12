"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionHeading from "../common/SectionHeading";
import ProductCard from "../common/ProductCard";

const product = {
  image:
    "https://shop.mango.com/assets/rcs/pics/static/T7/fotos/S/77084774_56.jpg",
  name: "Skylaboo Kids Shirt",
  price: "110.00",
};

const NewArrivals = () => {
  return (
    <div id="new" className="p-12">
      <div className="w-full flex flex-col gap-3 items-center justify-center">
        <SectionHeading title1={"New Arrival"} title2={"2025"} />
        <p className="text-center text-black/65 text-sm">
          Discover the cutest fresh picks for your little ones — just in!
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 1000,
        }}
        loop={true}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 5 },
        }}
        className="mt-8"
      >
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <ProductCard product={product} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default NewArrivals;
