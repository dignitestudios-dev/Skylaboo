"use client";
import Accordion from "@/components/common/Accordion";
import React, { useEffect, useMemo, useState } from "react";
import { InfoIcon } from "lucide-react";
import CheckoutProductCard from "@/components/checkout/CheckoutProductCard";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import Modal from "@/components/common/Modal";
import {
  setOrderType,
  updateContactEmail,
  updateDeliveryDetails,
} from "@/lib/features/cartSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { appConfigsHooks } from "@/hooks/appConfigs/AppConfigsHooks";
import PageLoader from "@/components/common/PageLoader";

const isBrowser = typeof window !== "undefined";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { loading } = appConfigsHooks.useGetAppConfigs();

  const shipping = useMemo(() => cart?.shippingCost || 0, [cart.shippingCost]);
  console.log("shipping: ",shipping)

  const [toggleTermsModal, setToggleTermsModal] = useState<"hide" | "show">(
    "hide"
  );
  const [togglePrivacyModal, setTogglePrivacyModal] = useState<"hide" | "show">(
    "hide"
  );
  const [emailNewsOffers, setEmailNewsOffers] = useState(true);
  const [deliveryFormData, setDeliveryFormData] = useState({
    contact: {
      email: cart.contact.email,
    },
    delivery: cart.delivery,
  });

  const subtotal = useMemo(() => {
    const cartItemsWithTotalPrice = cart.products.map((cartProduct) => {
      return {
        ...cartProduct,
        total: cartProduct.product.price * cartProduct.quantity,
      };
    });

    return cartItemsWithTotalPrice.reduce(
      (accumulator, cartItem) => accumulator + cartItem.total,
      0
    );
  }, [cart]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.removeItem("orderData");
    }
  }, []);

  if (loading) return <PageLoader />;

  // Handle order type changes
  const handleOrderTypeChange = (orderType: "delivery" | "pickup") => {
    dispatch(setOrderType(orderType));
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryFormData((prev) => ({
      ...prev,
      contact: {
        email: e.target.value,
      },
    }));
    dispatch(updateContactEmail(e.target.value));
  };

  // Handle delivery form input changes
  const handleDeliveryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDeliveryFormData((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [name]: e.target.value,
      },
    }));
    dispatch(updateDeliveryDetails({ [name]: value }));
  };

  const handleReviewOrder = () => {
    if (!cart.products.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!cart.contact.email) {
      toast.error("Please provide contact email");
      return;
    }

    const { address, city, country, firstName, lastName, phoneNumber } =
      cart.delivery;

    if (cart.orderType === "delivery") {
      if (
        !address ||
        !city ||
        !country ||
        !firstName ||
        !lastName ||
        !phoneNumber
      ) {
        toast.error("Delivery details are required");
        return;
      }
    }
    router.push("/confirm-order");
  };

  return (
    <>
      <div className="relative mt-20">
        {/* Yellow Glow */}
        <div className="absolute z-10 left-1/4 -top-12 w-[70%] h-[700px] bg-[#fad0bb]/60 rounded-full blur-[150px]" />

        <div className="relative overflow-hidden sm:px-12 px-6 sm:pb-16 pb-8 py-12">
          <div className="relative z-20 w-full grid md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <div>
                <p className="sm:text-xl font-bold mb-2">Contact</p>

                <div className="input-border p-0.5 rounded-full w-full h-[48px]">
                  <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                    <input
                      type="email"
                      className="outline-none border-none w-full"
                      name="email"
                      id="email"
                      value={deliveryFormData.contact.email}
                      onChange={handleEmailChange}
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
                      checked={emailNewsOffers}
                      onChange={(e) => setEmailNewsOffers(e.target.checked)}
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
                <div className="!p-0">
                  <Accordion
                    titleNode={<p className="sm:text-xl font-bold">Delivery</p>}
                    type="arrow"
                    h="1000"
                    active={cart.orderType === "delivery"}
                    onClick={() => handleOrderTypeChange("delivery")}
                  >
                    <form className="grid grid-cols-2 gap-5 sm:p-3 p-0">
                      <div className="input-border col-span-full">
                        <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                          <input
                            type="text"
                            className="outline-none border-none w-full"
                            name="country"
                            id="country"
                            value={deliveryFormData.delivery.country}
                            onChange={handleDeliveryInputChange}
                            placeholder="Country/Region"
                          />
                        </div>
                      </div>

                      <div className="input-border">
                        <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                          <input
                            type="text"
                            className="outline-none border-none w-full"
                            name="firstName"
                            id="firstName"
                            value={deliveryFormData.delivery.firstName}
                            onChange={handleDeliveryInputChange}
                            placeholder="First name"
                          />
                        </div>
                      </div>

                      <div className="input-border">
                        <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                          <input
                            type="text"
                            className="outline-none border-none w-full"
                            name="lastName"
                            id="lastName"
                            value={deliveryFormData.delivery.lastName}
                            onChange={handleDeliveryInputChange}
                            placeholder="Last name"
                          />
                        </div>
                      </div>

                      <div className="input-border col-span-full">
                        <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                          <input
                            type="text"
                            className="outline-none border-none w-full"
                            name="address"
                            id="address"
                            value={deliveryFormData.delivery.address}
                            onChange={handleDeliveryInputChange}
                            placeholder="Address"
                          />
                        </div>
                      </div>

                      <div className="input-border col-span-full">
                        <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                          <input
                            type="text"
                            className="outline-none border-none w-full"
                            name="apartment"
                            id="apartment"
                            value={deliveryFormData.delivery.apartment}
                            onChange={handleDeliveryInputChange}
                            placeholder="Apartment, suite, etc. (optional)"
                          />
                        </div>
                      </div>

                      <div className="input-border">
                        <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                          <input
                            type="text"
                            className="outline-none border-none w-full"
                            name="city"
                            id="city"
                            value={deliveryFormData.delivery.city}
                            onChange={handleDeliveryInputChange}
                            placeholder="City"
                          />
                        </div>
                      </div>

                      <div className="input-border">
                        <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                          <input
                            type="text"
                            className="outline-none border-none w-full"
                            name="postalCode"
                            id="postalCode"
                            value={deliveryFormData.delivery.postalCode}
                            onChange={handleDeliveryInputChange}
                            placeholder="Postal code (optional)"
                          />
                        </div>
                      </div>

                      <div className="input-border col-span-full">
                        <div className="rounded-full w-full h-full flex items-center gap-2 px-3">
                          <input
                            type="tel"
                            className="outline-none border-none w-full"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={deliveryFormData.delivery.phoneNumber}
                            onChange={handleDeliveryInputChange}
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                    </form>
                  </Accordion>
                </div>
              </div>

              <div className="input-border">
                <div className="!p-0">
                  <Accordion
                    titleNode={<p className="sm:text-xl font-bold">Pickup</p>}
                    type="arrow"
                    h="1000"
                    active={cart.orderType === "pickup"}
                    onClick={() => handleOrderTypeChange("pickup")}
                  >
                    <div className="input-border mx-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="rounded-full h-5 w-5 bg-multi-gradient flex justify-center items-center">
                            <div className="bg-white rounded-full h-2 w-2" />
                          </div>
                          <p className="text-[#707070] text-xs">
                            Pickup Address
                          </p>
                        </div>
                        <p>{cart.pickupAddress}</p>
                      </div>
                    </div>
                  </Accordion>
                </div>
              </div>

              <button
                className="w-full cursor-pointer flex justify-center items-center py-3 text-white bg-[var(--color-purple)] rounded-3xl rounded-tl-2xl"
                onClick={handleReviewOrder}
              >
                Review Order
              </button>

              <p className="mt-6 text-[#707070]">
                Your info will be saved to a Shop account. By continuing, you
                agree to Shop's
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
                  <p>${subtotal.toFixed(2)}</p>
                </div>

                <div className="w-full flex justify-between">
                  <p>Shipping</p>
                  <p>
                    $
                    {cart.orderType === "pickup" ? "0.00" : shipping.toFixed(2)}
                  </p>
                </div>

                <div className="sm:text-xl font-bold w-full flex justify-between">
                  <p>Total</p>
                  <p>
                    $
                    {cart.orderType === "pickup"
                      ? subtotal.toFixed(2)
                      : (subtotal + shipping).toFixed(2)}
                  </p>
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
    </>
  );
};

export default Checkout;
