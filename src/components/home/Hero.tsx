"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

const Hero = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="relative w-full min-h-[95vh] flex items-center bg-gradient-to-b from-transparent to-[#e9e2d4] sm:px-12 px-6">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={false}
        autoplay={{
          delay: 1000,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onInit={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        <SwiperSlide className="h-full">
          <div className="w-full h-full flex flex-col lg:justify-end justify-center lg:items-end items-center gap-10">
            <div className="lg:absolute top-1/4 left-0 space-y-5 relative z-20 lg:block lg:mt-0 mt-24">
              <h2 className="font-georgia min-[540px]:text-[52px] min-[380px]:text-[40px] text-[36px] min-[540px]:leading-[62px] min-[380px]:leading-[50px] leading-[40px]">
                Kids Summer{" "}
                <span className="gradient-text font-georgia font-black">
                  2025
                </span>{" "}
                <br className="sm:block hidden" />
                Delivery II
              </h2>
              <p className="text-sm">
                Explore the second iteration of Women Summer 2025, highlighted{" "}
                <br className="min-[540px]:block hidden" /> by collaborations
                with PUMA and AKILA.
              </p>
              <div className="lg:block flex justify-center">
                <button className="uppercase purple-btn">Shop now</button>
              </div>
            </div>

            <Image
              src={"/images/hero1.png"}
              alt="Skylaboo"
              width={1200}
              height={1200}
              className="lg:w-[900px] w-[500px]"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide className="h-full">
          <div className="w-full h-full flex flex-col lg:justify-end justify-center lg:items-end items-center gap-10">
            <div className="lg:absolute top-1/4 left-0 space-y-5 relative z-20 lg:block lg:mt-0 mt-24">
              <h2 className="font-georgia min-[540px]:text-[52px] min-[380px]:text-[40px] text-[36px] min-[540px]:leading-[62px] min-[380px]:leading-[50px] leading-[40px]">
                Kids Summer{" "}
                <span className="gradient-text font-georgia font-black">
                  2025
                </span>{" "}
                <br className="sm:block hidden" />
                Delivery II
              </h2>
              <p className="text-sm">
                Explore the second iteration of Women Summer 2025, highlighted{" "}
                <br className="min-[540px]:block hidden" /> by collaborations
                with PUMA and AKILA.
              </p>
              <div className="lg:block flex justify-center">
                <button className="uppercase purple-btn">Shop now</button>
              </div>
            </div>

            <Image
              src={"/images/hero1.png"}
              alt="Skylaboo"
              width={1200}
              height={1200}
              className="lg:w-[900px] w-[500px]"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute bottom-0 right-0 flex items-center gap-2 mb-3 me-6">
        <button
          ref={prevRef}
          onClick={() => swiperRef.current?.slidePrev()}
          className={`rounded-xl h-8 w-8 cursor-pointer disabled:cursor-not-allowed flex justify-center items-center transition-all duration-200 ${
            isBeginning
              ? "text-gray-400 bg-white/50"
              : "text-white bg-[var(--color-purple)] hover:bg-opacity-80"
          }`}
          aria-label="Previous slide"
          disabled={isBeginning}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          ref={nextRef}
          onClick={() => swiperRef.current?.slideNext()}
          className={`rounded-xl h-8 w-8 cursor-pointer disabled:cursor-not-allowed flex justify-center items-center transition-all duration-200 ${
            isEnd
              ? "text-gray-400 bg-white/50 cursor-not-allowed"
              : "text-white bg-[var(--color-purple)] hover:bg-opacity-80"
          }`}
          aria-label="Next slide"
          disabled={isEnd}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
