import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: {
    image: string;
    name: string;
    price: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="space-y-2">
      <div
        className="h-[330px] rounded-t-[20px] bg-cover "
        style={{
          backgroundImage: `url(${product.image})`,
        }}
      />
      <p className="text-[#333333] text-sm font-georgia">{product.name}</p>
      <p className="text-[#333333] text-sm">${product.price}</p>
    </div>
  );
};

export default ProductCard;
