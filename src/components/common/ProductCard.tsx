import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: {
    id: number;
    image: string;
    name: string;
    price: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/shop/${product.id}`} className="w-full cursor-pointer">
      <div className="space-y-2">
        <div
          className="group relative sm:h-[330px] h-[280px] rounded-t-[20px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${product.image})`,
          }}
        >
          <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full flex justify-center px-3 mb-3 transition-all duration-500">
            <button className="cursor-pointer uppercase bg-purple-gradient text-white px-4 py-2 w-full rounded-3xl rounded-tl-2xl">
              Add to cart
            </button>
          </div>
        </div>
        <p className="text-[#333333] text-sm font-georgia">{product.name}</p>
        <p className="text-[#333333] text-sm">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
