"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Accordion from "@/components/common/Accordion";
import React, { useMemo, useState } from "react";
import PaymentForm from "@/components/checkout/PaymentForm";
import { InfoIcon } from "lucide-react";
import CheckoutProductCard from "@/components/checkout/CheckoutProductCard";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";

const Checkout = () => {
  const [isDelivery, setIsDelivery] = useState<boolean>(true);
  const { cartItems } = useAppSelector((state) => state.cart);

  const shipping = 50;
  const subtotal = useMemo(() => {
    const cartItemsWithTotalPrice = cartItems.map((cartItem) => {
      return {
        ...cartItem,
        total: cartItem.price * cartItem.quantity,
      };
    });

    return cartItemsWithTotalPrice.reduce(
      (accumulator, cartItem) => accumulator + cartItem.total,
      0
    );
  }, [cartItems]);

  //   my project is an ecommerece platform. Users selects products and then enter delivery address and the stripe elements is showing the input to enter card, these are done. Now there is a Review Order button then the user redirect to the Review Order page showing the card details order details and delivery details then user clicks on Checkout then payment deduct. Now tell me how this will happen

  return (
    <div className="relative mt-20">
      {/* Yellow Glow */}
      <div className="absolute z-10 left-1/4 -top-12 w-[70%] h-[700px] bg-[#fad0bb]/60 rounded-full blur-[150px]" />

      <div className="relative overflow-hidden px-12 pb-16">
        <div className="relative z-20 w-full grid grid-cols-2 gap-10">
          <div className="space-y-5">
            <div>
              <p className="text-xl font-bold mb-2">Contact</p>

              <div className="input-border p-0.5 rounded-full w-full h-[48px]">
                <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                  <input
                    type="text"
                    className="outline-none border-none w-full"
                    name="name"
                    id="name"
                    // value={formData.name}
                    // onChange={handleInputChange}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="inline-flex items-center mt-3">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-gray-400 checked:border-none checked:bg-[var(--color-purple)]"
                    id="check"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <p className="ms-2 text-sm">Email me with news and offers</p>
              </div>
            </div>

            <div className="input-border">
              <div
                className="!p-0"
                onClick={() => setIsDelivery((prev) => !prev)}
              >
                <Accordion
                  titleNode={<p className="text-xl font-bold">Delivery</p>}
                  type="arrow"
                  h="1000"
                  active={isDelivery}
                >
                  <form className="grid grid-cols-2 gap-5 p-3">
                    <div className="input-border col-span-full">
                      <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                        <input
                          type="text"
                          className="outline-none border-none w-full"
                          name="name"
                          id="name"
                          // value={formData.name}
                          // onChange={handleInputChange}
                          placeholder="Country/Region"
                        />
                      </div>
                    </div>

                    <div className="input-border">
                      <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                        <input
                          type="text"
                          className="outline-none border-none w-full"
                          name="name"
                          id="name"
                          // value={formData.name}
                          // onChange={handleInputChange}
                          placeholder="First name"
                        />
                      </div>
                    </div>

                    <div className="input-border">
                      <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                        <input
                          type="text"
                          className="outline-none border-none w-full"
                          name="name"
                          id="name"
                          // value={formData.name}
                          // onChange={handleInputChange}
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div className="input-border col-span-full">
                      <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                        <input
                          type="text"
                          className="outline-none border-none w-full"
                          name="name"
                          id="name"
                          // value={formData.name}
                          // onChange={handleInputChange}
                          placeholder="Address"
                        />
                      </div>
                    </div>

                    <div className="input-border col-span-full">
                      <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                        <input
                          type="text"
                          className="outline-none border-none w-full"
                          name="name"
                          id="name"
                          // value={formData.name}
                          // onChange={handleInputChange}
                          placeholder="Apartment, suite, etc. (optional)"
                        />
                      </div>
                    </div>

                    <div className="input-border">
                      <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                        <input
                          type="text"
                          className="outline-none border-none w-full"
                          name="name"
                          id="name"
                          // value={formData.name}
                          // onChange={handleInputChange}
                          placeholder="City"
                        />
                      </div>
                    </div>

                    <div className="input-border">
                      <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                        <input
                          type="text"
                          className="outline-none border-none w-full"
                          name="name"
                          id="name"
                          // value={formData.name}
                          // onChange={handleInputChange}
                          placeholder="Postal code (optional)"
                        />
                      </div>
                    </div>

                    <div className="input-border col-span-full">
                      <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                        <input
                          type="text"
                          className="outline-none border-none w-full"
                          name="name"
                          id="name"
                          // value={formData.name}
                          // onChange={handleInputChange}
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                  </form>
                </Accordion>
              </div>
            </div>

            <div className="input-border">
              <div
                className="!p-0"
                onClick={() => setIsDelivery((prev) => !prev)}
              >
                <Accordion
                  titleNode={<p className="text-xl font-bold">Pickup</p>}
                  type="arrow"
                  h="1000"
                  active={!isDelivery}
                >
                  <div className="input-border mx-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="rounded-full h-5 w-5 bg-multi-gradient flex justify-center items-center">
                          <div className="bg-white rounded-full h-2 w-2" />
                        </div>
                        <p className="text-[#707070] text-xs">Pickup Address</p>
                      </div>
                      <p>
                        742 Evergreen Terrace, Apt 5B, Springfield, California,
                        62704
                      </p>
                    </div>
                  </div>
                </Accordion>
              </div>
            </div>

            <Link href={"/confirm-order"} className="w-full">
              <button className="w-full cursor-pointer flex justify-center items-center py-3 text-white bg-[var(--color-purple)] rounded-3xl rounded-tl-2xl">
                Review Order
              </button>
            </Link>

            <p className="mt-6 text-[#707070]">
              Your info will be saved to a Shop account. By continuing, you
              agree to Shop’s
              <button className="underline">Terms of Service</button> and
              acknowledge the{" "}
              <button className="underline">Privacy Policy</button>
            </p>

            <div className="w-full h-0.5 bg-multi-gradient rounded-full" />

            <div className="space-x-5">
              <button className="text-[var(--color-purple)] underline">
                Refund policy
              </button>
              <button className="text-[var(--color-purple)] underline">
                Refund policy
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-12 space-y-12">
            <div className="space-y-8">
              {cartItems.map((cartItem, index) => (
                <CheckoutProductCard key={index} cartItem={cartItem} />
              ))}
            </div>

            <div className="space-y-3">
              <div className="w-full h-0.5 bg-multi-gradient rounded-full" />

              <div className="w-full flex justify-between">
                <p>Subtotal - {cartItems.length} items</p>
                <p>${subtotal}</p>
              </div>

              <div className="w-full flex justify-between">
                <p>Shipping</p>
                <p>${shipping}</p>
              </div>

              <div className="text-xl font-bold w-full flex justify-between">
                <p>Total</p>
                <p>${subtotal + shipping}</p>
              </div>

              <div className="w-full h-0.5 bg-multi-gradient rounded-full" />
            </div>

            <div className="input-border">
              <div className="bg-[#fff7fe] flex items-start gap-3">
                <InfoIcon size={52} className="text-[var(--color-purple)]" />
                <p className="text-[#1C1C1C]">
                  Lorem ipsum dolor sit amet consectetur. Ut enim lorem at
                  condimentum pellentesque. Lobortis mattis in et sit tortor
                  amet et. Eu enim quis sit tristique volutpat magna feugiat
                  sagittis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bg Glows */}
        <div className="absolute z-10 -left-[300px] -bottom-24 w-[1400px] h-[600px] bg-[var(--color-yellow)]/20 rounded-full blur-[120px]" />
        <div className="absolute z-10 -right-[300px] -bottom-12 w-[1400px] h-[600px] bg-[var(--color-purple)]/20 rounded-full blur-[120px]" />
      </div>
    </div>
  );
};

export default Checkout;
