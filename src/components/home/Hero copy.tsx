"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const swiperRef = useRef(null);

  return (
    <section className="w-full min-h-[90vh]">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 1000,
          }}
          loop={true}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
            renderBullet: function (index, className) {
              return '<span class="' + className + '"></span>';
            },
          }}
          className="w-full h-full relative z-10"
        >
          <SwiperSlide>
            <div className="w-full h-full flex">
              <div className="space-y-5">
                <h2 className="font-georgia text-[52px] leading-[62px]">
                  Kids Summer{" "}
                  <span className="gradient-text font-georgia font-black">
                    2025
                  </span>{" "}
                  <br />
                  Delivery I
                </h2>
                <p className="text-sm">
                  Explore the second iteration of Women Summer 2025, highlighted{" "}
                  <br /> by collaborations with PUMA and AKILA.
                </p>
                <button className="uppercase purple-btn">Shop now</button>
              </div>

              <Image
                src={"/images/hero1.png"}
                alt="Skylaboo"
                width={2400}
                height={2400}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="w-full">
              <div className="space-y-5">
                <h2 className="font-georgia text-[52px] leading-[62px]">
                  Kids Summer{" "}
                  <span className="gradient-text font-georgia font-black">
                    2025
                  </span>{" "}
                  <br />
                  Delivery II
                </h2>
                <p className="text-sm">
                  Explore the second iteration of Women Summer 2025, highlighted{" "}
                  <br /> by collaborations with PUMA and AKILA.
                </p>
                <button className="uppercase purple-btn">Shop now</button>
              </div>

              <Image
                src={"/images/hero1.png"}
                alt="Skylaboo"
                width={2400}
                height={2400}
                className="absolute -top-40 -right-22"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation and Pagination */}
        <div className="flex items-center justify-end mt-12 me-8">
          <div className="w-fit flex items-center justify-center gap-6">
            {/* Previous Button */}
            <button className="custom-prev flex items-center justify-center cursor-pointer w-10 h-10 min-w-10 min-h-10 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Custom Pagination */}
            <div className="custom-pagination flex items-center gap-2"></div>

            {/* Next Button */}
            <button className="custom-next flex items-center justify-center cursor-pointer w-10 h-10 min-w-10 min-h-10 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
    </section>
  );
};

export default Hero;
