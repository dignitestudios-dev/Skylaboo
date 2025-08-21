import { Cart, CartProduct } from "@/lib/types";
import React from "react";

interface CheckoutProductCardProps {
  cartProduct: CartProduct;
}

const CheckoutProductCard: React.FC<CheckoutProductCardProps> = ({
  cartProduct,
}) => {
  const product = cartProduct.product;

  return (
    <div className="flex justify-between gap-10">
      <div className="flex gap-3 h-full">
        <div className="h-full">
          <div
            className="relative w-[72px] h-[72px] rounded-lg bg-center bg-cover"
            style={{
              backgroundImage: `url(${product.images[0].link})`,
            }}
          >
            <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-[var(--color-purple)] flex justify-center items-center">
              <p className="text-white font-bold text-sm">
                {cartProduct.quantity}
              </p>
            </div>
          </div>
        </div>

        <div className="h-full">
          <p className="text-sm mb-6">{product.title}</p>
          <p className="text-sm text-gray-500">{cartProduct.selectedSize}</p>
        </div>
      </div>
      <div>
        <p className="font-bold">${(product.price * cartProduct.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
