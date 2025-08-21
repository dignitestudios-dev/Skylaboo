import {
  removeProductFromCart,
  updateCartProduct,
} from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { CartProduct as CartProductType } from "@/lib/types";
import Image from "next/image";
import React, { useMemo } from "react";

interface CartProductProps {
  cartProduct: CartProductType;
}

const CartProduct: React.FC<CartProductProps> = ({ cartProduct }) => {
  const dispatch = useAppDispatch();
  const product = useMemo(() => cartProduct.product, [cartProduct.product]);

  const handleUpdateCartProduct = (
    type: "inc" | "dec",
    productId: string,
    selectedColor: string,
    selectedSize: string
  ) => {
    dispatch(
      updateCartProduct({ type, productId, selectedColor, selectedSize })
    );
  };

  const handleRemoveProductFromCart = (
    productId: string,
    selectedColor: string,
    selectedSize: string
  ) => {
    dispatch(removeProductFromCart({ productId, selectedColor, selectedSize }));
  };

  return (
    <div className="flex sm:gap-4 gap-2 py-2">
      <div
        className="w-[200px] sm:h-[200px] h-[140px] rounded-t-[20px] bg-center bg-cover"
        style={{
          backgroundImage: `url(${product.images[0].link})`,
        }}
      />

      <div className="flex-1 sm:space-y-2.5">
        <p className="text-[#333333] font-georgia sm:text-xl">
          Skylaboo {product.title} For Kids
        </p>
        <p className="font-bold">${product.price}</p>
        <div className="space-y-1">
          <p className="uppercase text-gray-500 font-extralight sm:text-sm text-xs">
            Color: {cartProduct.selectedColor}
          </p>
          <p className="uppercase text-gray-500 font-extralight sm:text-sm text-xs">
            Size: {cartProduct.selectedSize}
          </p>
          <div className="uppercase text-gray-500 font-extralight sm:text-sm text-xs flex items-center gap-3">
            <p>Quantity:</p>{" "}
            <div className="flex items-center gap-3">
              <button
                className={`h-5 w-5 flex justify-center cursor-pointer disabled:cursor-not-allowed items-center rounded-sm text-2xl font-extralight ${
                  cartProduct.quantity <= 1
                    ? "bg-gray-100 text-black"
                    : "bg-multi-gradient text-white"
                }`}
                disabled={cartProduct.quantity <= 1}
                onClick={() =>
                  handleUpdateCartProduct(
                    "dec",
                    product._id,
                    cartProduct.selectedColor,
                    cartProduct.selectedSize
                  )
                }
              >
                -
              </button>
              <div className="w-4 flex justify-center">
                <p>{cartProduct.quantity}</p>
              </div>
              <button
                className={`h-5 w-5 flex justify-center cursor-pointer disabled:cursor-not-allowed items-center rounded-sm text-xl font-extralight ${
                  false
                    ? "bg-gray-100 text-black"
                    : "bg-multi-gradient text-white"
                }`}
                onClick={() =>
                  handleUpdateCartProduct(
                    "inc",
                    product._id,
                    cartProduct.selectedColor,
                    cartProduct.selectedSize
                  )
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="text-red-500 cursor-pointer"
            onClick={() =>
              handleRemoveProductFromCart(
                product._id,
                cartProduct.selectedColor,
                cartProduct.selectedSize
              )
            }
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
