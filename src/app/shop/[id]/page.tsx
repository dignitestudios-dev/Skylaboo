"use client";
import Accordion from "@/components/common/Accordion";
import NewArrivals from "@/components/home/NewArrivals";
import Check from "@/components/icons/Check";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const colors = ["Red", "Green", "Blue", "White", "Black"];
const sizes = ["0-3", "3-6", "6-9", "9-12", "12-18"];

const ProductDetails = () => {
  const [selectedDetails, setSelectedDetails] = useState({
    color: "Red",
    size: "0-3",
    quantity: 1,
  });

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

  return (
    <div className="mt-6 relative">
      {/* Yellow Glow */}
      <div className="absolute z-10 left-1/4 -top-12 w-[70%] h-[700px] bg-[#fad0bb]/60 rounded-full blur-[150px]" />

      <div className=" px-12 relative overflow-hidden">
        <div className="relative z-20">
          <div className="flex items-center gap-2 uppercase text-sm text-[#333333]">
            <Link href={"/"}>Home</Link>
            <ChevronRight size={16} />
            <Link href={"/shop"}>Shop</Link>
            <ChevronRight size={16} />
            <p>Baby Summer 2025 Delivery II</p>
          </div>

          <section id="about" className="py-6 relative overflow-hidden">
            <div className="relative z-20 grid grid-cols-2 gap-20 mb-10">
              <div
                className="relative bg-cover bg-center h-full min-h-[600px] w-full rounded-3xl flex justify-center items-center"
                style={{
                  backgroundImage: `url(/images/about.png)`,
                }}
              />
              <div className="flex flex-col justify-center gap-6">
                <p className="text-sm text-[#333333]">
                  Skylaboo Baby Summer 2025 Delivery II
                </p>
                <p className="text-xl font-georgia">
                  Skylaboo Baby Scenic Villa Belmont Coverall
                </p>
                <p className="text-2xl font-black">$75.00</p>
                <div className="w-full h-0.5 bg-multi-gradient rounded-full" />
                <div>
                  <p className="uppercase text-sm">Color</p>
                  <div className="mt-2 space-x-4">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        className={`rounded-3xl rounded-bl-2xl rounded-tl-[28px] text-xs border border-white py-3 px-4 font-medium cursor-pointer w-[75px] ${
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
                  <div className="mt-2 space-x-4">
                    {sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`rounded-3xl rounded-bl-2xl rounded-tl-[28px] text-xs border border-white py-3 px-4 font-medium cursor-pointer w-[75px] ${
                          selectedDetails.size === size
                            ? "text-white bg-multi-gradient"
                            : "text-[#333333] bg-transparent"
                        }`}
                        onClick={() => handleSelectProductDetails("size", size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-5">
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
                    <div className="flex-1/2 h-full flex justify-center items-center bg-white/35">
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

                  <button className="cursor-pointer uppercase bg-purple-gradient text-white px-4 py-2 w-[280px] max-w-full rounded-3xl rounded-tl-2xl rounded-bl-[30px]">
                    Add to Card
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <p className="uppercase font-black text-sm">
                    Receiving Options:
                  </p>

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
                <Accordion
                  title="Description"
                  content="DISCOVER QUALITY CLOTHING DESIGNED FOR COMFORT, STYLE, AND
                  EVERYDAY WEAR. EACH PIECE IS CRAFTED WITH CARE TO BRING YOU
                  THE BEST FIT AND FEEL."
                />

                <Accordion
                  title="shipping AND RETURN"
                  content="We offer fast, reliable shipping straight to your doorstep. If you’re not fully satisfied with your order, you can easily return or exchange items within [X] days of delivery."
                />
              </div>
            </div>
          </section>

          <NewArrivals />

          <div className="w-full flex justify-center px-3 mb-12">
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
  );
};

export default ProductDetails;
