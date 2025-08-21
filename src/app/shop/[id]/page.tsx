"use client";
import Accordion from "@/components/common/Accordion";
import PageLoader from "@/components/common/PageLoader";
import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import NewArrivals from "@/components/home/NewArrivals";
import Check from "@/components/icons/Check";
import { productHooks } from "@/hooks/products/ProductHooks";
import { addProductToCart } from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Cart, Product } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const colors = ["Red", "Green", "Blue", "White", "Black"];
const sizes = ["0-3", "3-6", "6-9", "9-12", "12-18"];

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { loading, product } = productHooks.useGetProductById(id as string);
  const { loading: loadingAllProducts, products } =
    productHooks.useGetAllProducts(1, 10, "");

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [selectedDetails, setSelectedDetails] = useState({
    color: "",
    size: "",
    quantity: 1,
  });

  useEffect(() => {
    setSelectedDetails((prev) => ({
      ...prev,
      color: product?.colors[0] || "",
      size: product?.sizes[0] || "",
    }));
  }, [product]);

  if (loading || loadingAllProducts) return <PageLoader />;

  const handleSelectProductDetails = (
    label: "color" | "size",
    value: string
  ) => {
    setSelectedDetails((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSetProductQuantity = (type: "inc" | "dec") => {
    console.log("type: ", type);
    setSelectedDetails((prev) => ({
      ...prev,
      quantity:
        type === "dec"
          ? prev.quantity === 1
            ? prev.quantity
            : prev.quantity--
          : prev.quantity++,
    }));
  };

  const handleAddProductToCart = (product: Product) => {
    const cartProduct: Cart = {
      product: product,
      quantity: selectedDetails?.quantity || 1,
      selectedColor: selectedDetails?.color || product.colors[0],
      selectedSize: selectedDetails?.size || product.sizes[0],
    };

    dispatch(addProductToCart(cartProduct));
  };

  return (
    <>
      {/* Common navigation bar */}
      <Navbar />
      <div className="lg:mt-6 mt-24 relative">
        {/* Yellow Glow */}
        <div className="absolute z-10 left-1/4 -top-12 w-[70%] h-[700px] bg-[#fad0bb]/60 rounded-full blur-[150px]" />

        <div className="relative overflow-hidden">
          <div className="relative z-20">
            {!product ? (
              <div className="w-full flex justify-center py-6">
                <p className="text-gray-400">Product not found</p>
              </div>
            ) : (
              <>
                <div className="sm:px-12 px-6 flex items-center sm:flex-nowrap flex-wrap gap-2 uppercase sm:text-sm text-xs text-[#333333]">
                  <Link href={"/"}>Home</Link>
                  <ChevronRight size={16} />
                  <Link href={"/shop"}>Shop</Link>
                  <ChevronRight size={16} />
                  <p>{product?.title}</p>
                </div>

                <section
                  id="about"
                  className="sm:px-12 px-6 py-6 relative overflow-hidden"
                >
                  <div className="relative z-20 grid sm:grid-cols-2 lg:gap-20 gap-10 mb-10">
                    <div>
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                          delay: 3000,
                        }}
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
                        className="px-12"
                      >
                        {product?.images?.map((image, index) => (
                          <SwiperSlide key={index}>
                            <div
                              className="relative bg-contain bg-no-repeat bg-gray-100 bg-center md:h-full sm:h-fit min-[425px]:h-[80vh] h-[280px] sm:min-h-[600px] min-[425px]:min-h-[300px] min-w-[220px] w-full rounded-3xl flex justify-center items-center"
                              style={{
                                backgroundImage: `url(${image.link})`,
                              }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <div className="flex flex-col justify-center lg:gap-6 gap-3">
                      <p className="text-sm text-[#333333]">
                        {product?.subtitle}
                      </p>
                      <p className="text-xl font-georgia">{product?.title}</p>
                      <p className="text-2xl font-black">${product?.price}</p>
                      <div className="w-full h-0.5 bg-multi-gradient rounded-full" />
                      <div>
                        <p className="uppercase text-sm">Color</p>
                        <div className="mt-2 flex md:gap-4 gap-2 flex-wrap">
                          {product?.colors?.map((color, index) => (
                            <button
                              key={index}
                              className={`rounded-3xl rounded-bl-2xl md:rounded-tl-[28px] rounded-tl-[24px] text-xs border border-white md:py-3 py-1.5 md:px-4 px-2 font-medium cursor-pointer md:min-w-[75px] min-w-14 ${
                                selectedDetails.color === color
                                  ? "text-white bg-multi-gradient"
                                  : "text-[#333333] bg-transparent"
                              }`}
                              onClick={() =>
                                handleSelectProductDetails("color", color)
                              }
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="uppercase text-sm">sizes</p>
                        <div className="mt-2 flex md:gap-4 gap-2 flex-wrap">
                          {product?.sizes.map((size, index) => (
                            <button
                              key={index}
                              className={`rounded-3xl rounded-bl-2xl md:rounded-tl-[28px] rounded-tl-[24px] text-xs border border-white md:py-3 py-1.5 md:px-4 px-2 font-medium cursor-pointer md:w-[75px] w-14 ${
                                selectedDetails.size === size
                                  ? "text-white bg-multi-gradient"
                                  : "text-[#333333] bg-transparent"
                              }`}
                              onClick={() =>
                                handleSelectProductDetails("size", size)
                              }
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="w-full flex min-[680px]:flex-row min-[470px]:flex-row flex-col  min-[680px]:items-center gap-5">
                        <div className="rounded-3xl rounded-bl-2xl rounded-tl-[28px] text-sm bg-multi-gradient h-full w-full max-w-[180px] font-medium cursor-pointer overflow-hidden flex justify-between">
                          <button
                            className={`h-full px-4 bg-[var(--color-yellow)] font-bold ${
                              selectedDetails.quantity === 1
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            } text-2xl text-white`}
                            disabled={selectedDetails.quantity === 1}
                            onClick={() => handleSetProductQuantity("dec")}
                          >
                            -
                          </button>
                          <div className="flex-1/2 h-full flex justify-center items-center bg-white/35 min-w-6">
                            <p>
                              {selectedDetails.quantity < 10
                                ? `0${selectedDetails.quantity}`
                                : selectedDetails.quantity}
                            </p>
                          </div>
                          <button
                            className="h-full px-4 bg-[var(--color-purple)] font-bold cursor-pointer text-2xl text-white"
                            onClick={() => handleSetProductQuantity("inc")}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="text-nowrap cursor-pointer uppercase bg-purple-gradient text-white px-4 py-2 min-[425px]:w-[280px] w-[240px] max-w-full rounded-3xl rounded-tl-2xl rounded-bl-[30px] md:text-base text-sm"
                          onClick={() => handleAddProductToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div className="flex md:flex-row flex-col md:items-center sm:gap-4 gap-2">
                        <p className="uppercase font-black text-sm">
                          Receiving Options:
                        </p>

                        <div className="flex items-center gap-4">
                          <button
                            className={`rounded-3xl rounded-bl-2xl rounded-tl-[28px] text-xs border border-white py-2 px-4 font-bold cursor-pointer w-[120px] text-[#333333] bg-transparent flex items-center gap-2`}
                          >
                            <Check />
                            Delivery
                          </button>

                          <button
                            className={`rounded-3xl rounded-bl-2xl rounded-tl-[28px] text-xs border border-white py-2 px-4 font-bold cursor-pointer w-[120px] text-[#333333] bg-transparent flex items-center gap-2`}
                          >
                            <Check />
                            Pickup
                          </button>
                        </div>
                      </div>
                      <Accordion
                        titleNode={
                          <p className="uppercase text-sm">Description</p>
                        }
                      >
                        <div className="text-gray-500 text-sm !pt-0">
                          {product?.description || "No description"}
                        </div>
                      </Accordion>

                      <Accordion
                        titleNode={
                          <p className="uppercase text-sm">
                            Shipping AND RETURN
                          </p>
                        }
                      >
                        <div className="text-gray-500 text-sm !pt-0">
                          We offer fast, reliable shipping straight to your
                          doorstep. If you’re not fully satisfied with your
                          order, you can easily return or exchange items within
                          [X] days of delivery.
                        </div>
                      </Accordion>
                    </div>
                  </div>
                </section>
              </>
            )}

            <NewArrivals />

            <div className="sm:px-12 px-6 w-full flex justify-center mb-12">
              <Link href={"/shop"}>
                <button className="cursor-pointer uppercase bg-purple-gradient text-white px-4 py-2 w-[190px] max-w-full rounded-3xl rounded-tl-2xl">
                  View all
                </button>
              </Link>
            </div>
          </div>

          {/* Bg Glows */}
          <div className="absolute z-10 -left-[300px] -bottom-12 w-[1400px] h-[600px] bg-[var(--color-yellow)]/20 rounded-full blur-[120px]" />
          <div className="absolute z-10 -right-[300px] -bottom-12 w-[1400px] h-[600px] bg-[var(--color-purple)]/20 rounded-full blur-[120px]" />
        </div>
      </div>
      {/* Common footer */}
      <Footer />
    </>
  );
};

export default ProductDetails;
