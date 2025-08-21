"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Accordion from "@/components/common/Accordion";
import React, { useMemo, useState } from "react";
import PaymentForm from "@/components/checkout/PaymentForm";
import { InfoIcon, MoveLeft } from "lucide-react";
import CheckoutProductCard from "@/components/checkout/CheckoutProductCard";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import Copy from "@/components/icons/Copy";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const ConfirmOrder = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const [toggleTermsModal, setToggleTermsModal] = useState<"hide" | "show">(
    "hide"
  );
  const [togglePrivacyModal, setTogglePrivacyModal] = useState<"hide" | "show">(
    "hide"
  );

  const shipping = 50;
  const subtotal = useMemo(() => {
    const cartItemsWithTotalPrice = cart?.products?.map((cartProduct) => {
      return {
        ...cartProduct,
        total: cartProduct.product.price * cartProduct.quantity,
      };
    });

    return cartItemsWithTotalPrice.reduce(
      (accumulator, cartProduct) => accumulator + cartProduct.total,
      0
    );
  }, [cart]);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText("26413"); // Replace "26413" with the dynamic order ID if needed
    toast.success("Order ID copied!");
  };

  return (
    <>
      {/* Common navigation bar */}
      <Navbar />{" "}
      <div className="relative mt-20 bg-[#fffdf9]">
        {/* Yellow Glow */}
        <div className="absolute z-10 left-1/4 -top-28 w-[70%] h-[700px] bg-[#fad0bb]/60 rounded-full blur-[150px]" />

        <div className="relative overflow-hidden sm:px-12 px-6 sm:pb-16 pb-8">
          <div className="relative z-20 w-full grid md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <Link href="/checkout" className="flex gap-2 items-center">
                <MoveLeft /> Back
              </Link>

              <div className="space-y-3">
                <p className="font-black">Review Order</p>
                <div className="flex items-center gap-2">
                  <p className="text-[#707070] text-sm">
                    Order ID:{" "}
                    <span className="font-bold text-black">26413</span>
                  </p>
                  <button
                    onClick={handleCopyOrderId}
                    className="cursor-pointer"
                  >
                    <Copy />
                  </button>
                </div>
                <p className="text-[#707070] text-sm">
                  Order Date:{" "}
                  <span className="font-bold text-black">21 July, 2025</span>
                </p>
              </div>

              <div className="rounded-t-xl overflow-hidden">
                <div className="bg-white p-2">
                  <p className="sm:text-xl font-black sm:mb-2">Contact</p>
                </div>

                <div className="bg-[var(--color-purple)]/10 w-full sm:p-6 p-3">
                  <div>
                    <p className="text-xs text-[#707070]">Email</p>
                    <p>john.doe@mail.com</p>
                  </div>

                  <div className="inline-flex items-center mt-3">
                    <label className="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-gray-400 checked:border-none checked:bg-[var(--color-purple)]"
                        id="check"
                        checked
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
                    <p className="ms-2 text-sm">
                      Email me with news and offers
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-t-xl overflow-hidden">
                <div className="bg-white p-2">
                  <p className="sm:text-xl font-black sm:mb-2">Delivery</p>
                </div>

                <div className="bg-[var(--color-purple)]/10 w-full sm:p-6 p-3 sm:space-y-6 space-y-3">
                  <div>
                    <p className="text-xs text-[#707070]">Address</p>
                    <p>742 Evergreen Terrace</p>
                  </div>

                  <div>
                    <p className="text-xs text-[#707070]">Apartment</p>
                    <p>Apt 5B</p>
                  </div>

                  <div>
                    <p className="text-xs text-[#707070]">City</p>
                    <p>Springfield, California</p>
                  </div>

                  <div>
                    <p className="text-xs text-[#707070]">Postal Code</p>
                    <p>62704</p>
                  </div>

                  <div>
                    <p className="text-xs text-[#707070]">Name</p>
                    <p>John Doe</p>
                  </div>

                  <div>
                    <p className="text-xs text-[#707070]">Phone Number</p>
                    <p>+1 (217) 555-0198</p>
                  </div>
                </div>
              </div>

              <div className="input-border rounded-lg">
                <div className="!py-2 !px-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="rounded-full h-5 w-5 bg-multi-gradient flex justify-center items-center">
                      <div className="bg-white rounded-full h-2 w-2" />
                    </div>
                    <p className="text-[#707070] text-xs">
                      Credit or Debit Card
                    </p>
                  </div>
                  <Elements stripe={stripePromise}>
                    <PaymentForm />
                  </Elements>
                </div>
              </div>

              <button className="w-full flex justify-center items-center py-3 text-white bg-[var(--color-purple)] rounded-3xl rounded-tl-2xl">
                Confirm Order
              </button>

              <p className="mt-6 text-[#707070]">
                Your info will be saved to a Shop account. By continuing, you
                agree to Shop’s
                <button
                  className="underline cursor-pointer"
                  onClick={() => setToggleTermsModal("show")}
                >
                  Terms of Service
                </button>{" "}
                and acknowledge the{" "}
                <button
                  className="underline cursor-pointer"
                  onClick={() => setTogglePrivacyModal("show")}
                >
                  Privacy Policy
                </button>
              </p>

              <div className="w-full h-0.5 bg-multi-gradient rounded-full" />

              <div className="space-x-5">
                <button className="text-[var(--color-purple)] underline">
                  Refund policy
                </button>
                <button className="text-[var(--color-purple)] underline">
                  Terms of service
                </button>
              </div>
            </div>

            <div className="bg-white sm:rounded-3xl rounded-2xl sm:p-12 min-[520px]:p-6 p-4 sm:space-y-12 space-y-6">
              <div className="space-y-8">
                {cart?.products?.map((cartProduct, index) => (
                  <CheckoutProductCard key={index} cartProduct={cartProduct} />
                ))}
              </div>

              <div className="space-y-3">
                <div className="w-full h-0.5 bg-multi-gradient rounded-full" />

                <div className="w-full flex justify-between">
                  <p>Subtotal - {cart?.products?.length} items</p>
                  <p>${subtotal}</p>
                </div>

                <div className="w-full flex justify-between">
                  <p>Shipping</p>
                  <p>${shipping}</p>
                </div>

                <div className="sm:text-xl font-bold w-full flex justify-between">
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
      {/* Terms and Conditions */}
      <Modal
        showModal={toggleTermsModal}
        onHide={() => setToggleTermsModal("hide")}
      >
        <div>
          <p className="text-center text-2xl text-[var(--color-purple)] font-bold mb-2">
            Terms & Conditions
          </p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            mollitia ipsum assumenda. Autem officiis reprehenderit corporis unde
            omnis enim deleniti ratione consequuntur, laboriosam commodi
            exercitationem quidem praesentium iste odit repellat reiciendis,
            harum ea? Cupiditate nesciunt optio nulla recusandae rem fugiat
            dolorum fuga reiciendis, consectetur officia expedita vitae quaerat
            minima hic dolores libero voluptatibus assumenda soluta beatae illum
            explicabo sapiente! Cumque nulla eveniet excepturi enim illum
            corrupti consequuntur provident recusandae et! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Exercitationem velit fugit
            expedita rerum tempora aliquid, odio minus dolore maxime iusto?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            necessitatibus odit aliquam qui quis mollitia assumenda ducimus
            nostrum, cupiditate in? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Alias sint iure modi nihil assumenda voluptate
            quam quo accusantium amet! Aliquam.
          </p>

          <br />

          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            mollitia ipsum assumenda. Autem officiis reprehenderit corporis unde
            omnis enim deleniti ratione consequuntur, laboriosam commodi
            exercitationem quidem praesentium iste odit repellat reiciendis,
            harum ea? Cupiditate nesciunt optio nulla recusandae rem fugiat
            dolorum fuga reiciendis, consectetur officia expedita vitae quaerat
            minima hic dolores libero voluptatibus assumenda soluta beatae illum
            explicabo sapiente! Cumque nulla eveniet excepturi enim illum
            corrupti consequuntur provident recusandae et! Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Rerum corporis voluptate
            itaque perspiciatis repellat temporibus harum fugiat suscipit
            aspernatur iusto.
          </p>
        </div>
      </Modal>
      {/* Privacy Policy */}
      <Modal
        showModal={togglePrivacyModal}
        onHide={() => setTogglePrivacyModal("hide")}
      >
        <div>
          <p className="text-center text-2xl text-[var(--color-purple)] font-bold mb-2">
            Privacy Policy
          </p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            mollitia ipsum assumenda. Autem officiis reprehenderit corporis unde
            omnis enim deleniti ratione consequuntur, laboriosam commodi
            exercitationem quidem praesentium iste odit repellat reiciendis,
            harum ea? Cupiditate nesciunt optio nulla recusandae rem fugiat
            dolorum fuga reiciendis, consectetur officia expedita vitae quaerat
            minima hic dolores libero voluptatibus assumenda soluta beatae illum
            explicabo sapiente! Cumque nulla eveniet excepturi enim illum
            corrupti consequuntur provident recusandae et! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Exercitationem velit fugit
            expedita rerum tempora aliquid, odio minus dolore maxime iusto?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            necessitatibus odit aliquam qui quis mollitia assumenda ducimus
            nostrum, cupiditate in? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Alias sint iure modi nihil assumenda voluptate
            quam quo accusantium amet! Aliquam.
          </p>

          <br />

          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            mollitia ipsum assumenda. Autem officiis reprehenderit corporis unde
            omnis enim deleniti ratione consequuntur, laboriosam commodi
            exercitationem quidem praesentium iste odit repellat reiciendis,
            harum ea? Cupiditate nesciunt optio nulla recusandae rem fugiat
            dolorum fuga reiciendis, consectetur officia expedita vitae quaerat
            minima hic dolores libero voluptatibus assumenda soluta beatae illum
            explicabo sapiente! Cumque nulla eveniet excepturi enim illum
            corrupti consequuntur provident recusandae et! Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Rerum corporis voluptate
            itaque perspiciatis repellat temporibus harum fugiat suscipit
            aspernatur iusto.
          </p>
        </div>
      </Modal>
      {/* Common footer */}
      <Footer />
    </>
  );
};

export default ConfirmOrder;
