"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useMemo } from "react";
import CartProduct from "./CartProduct";
import { Cart } from "@/lib/types";
import { utils } from "@/lib/utils";
import { X } from "lucide-react";
import { toggleShowCart } from "@/lib/features/cartSlice";
import Link from "next/link";

const CartSlider = () => {
  const dispatch = useAppDispatch();
  const { showCart, cart } = useAppSelector((state) => state.cart);

  const subtotal = useMemo(() => {
    const cartItemsWithTotalPrice = cart?.products?.map((cartItem) => {
      return {
        ...cartItem,
        total: cartItem.product.price * cartItem.quantity,
      };
    });

    return cartItemsWithTotalPrice.reduce(
      (accumulator, cartItem) => accumulator + cartItem.total,
      0
    );
  }, [cart]);

  const handleHideCart = () => {
    dispatch(toggleShowCart(false));
  };

  return (
    <div
      className={`h-screen w-full flex justify-end fixed top-0 ${
        showCart ? "right-0" : "right-[-100%]"
      } z-50 transition-all duration-500`}
      onClick={handleHideCart}
    >
      <aside
        className={`h-full w-[720px] max-w-[90%] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white min-h-full w-full sm:py-12 py-6">
          <div className="w-full flex justify-between items-center gap-10 mb-8 sm:px-12 min-[425px]:min-[425px]:px-6 px-3">
            <p className="sm:text-3xl text-xl font-georgia">
              Cart
              <span className="gradient-text font-georgia font-black sm:ms-2 ms-1">
                ({cart?.products?.length})
              </span>
            </p>
            <button className="cursor-pointer" onClick={handleHideCart}>
              <X />
            </button>
          </div>

          <div className="sm:px-12 min-[425px]:px-6 px-3">
            {!cart?.products || !cart?.products?.length ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              cart?.products?.map((cartProduct, index) => (
                <div key={index}>
                  <CartProduct cartProduct={cartProduct} />
                </div>
              ))
            )}
          </div>

          {cart?.products && cart?.products.length ? (
            <>
              <div className="mt-12 py-6 border-y border-[#00000033] sm:px-12 min-[425px]:px-6 px-3">
                <div className="w-full flex justify-between items-center gap-10">
                  <p className="text-sm font-bold">SUBTOTAL</p>

                  <p className="font-bold">${subtotal.toFixed(2)}</p>
                </div>
                <p className="text-sm font-extralight text-[#333333] mt-2">
                  SHIPPING & TAXES CALCULATED AT CHECKOUT
                </p>
              </div>

              <div className="sm:px-12 min-[425px]:px-6 px-3">
                <Link
                  href={"/checkout"}
                  onClick={handleHideCart}
                  className="w-full"
                >
                  <button className="uppercase font-bold cursor-pointer text-white rounded-3xl rounded-tl-2xl w-full bg-multi-gradient mt-6 py-4 tracking-wider">
                    Checkout
                  </button>
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </aside>
    </div>
  );
};

export default CartSlider;
