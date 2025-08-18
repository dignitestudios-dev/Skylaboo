"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionHeading from "../common/SectionHeading";
import ProductCard from "../common/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const product = {
  id: 123,
  image:
    "https://shop.mango.com/assets/rcs/pics/static/T7/fotos/S/77084774_56.jpg",
  name: "Skylaboo Kids Shirt",
  price: "110.00",
};

const NewArrivals = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div id="new" className="sm:p-12 p-6">
      <div className="w-full flex flex-col gap-3 items-center justify-center">
        <SectionHeading title1={"New Arrival"} title2={"2025"} />
        <p className="text-center text-black/65 text-sm">
          Discover the cutest fresh picks for your little ones — just in!
        </p>
      </div>

      <div className="relative mt-8">
        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute sm:-left-10 -left-6 top-1/2 text-gray-600 -translate-y-1/2 z-10 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          ref={nextRef}
          className="absolute sm:-right-10 -right-6 top-1/2 text-gray-600 -translate-y-1/2 z-10 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 1000,
          }}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // Type assertion to safely access navigation params
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation === "object"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          breakpoints={{
            560: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 5 },
          }}
          className="px-12"
        >
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default NewArrivals;
