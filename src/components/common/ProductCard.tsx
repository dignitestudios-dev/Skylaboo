"use client";
import { addProductToCart } from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Cart, Product } from "@/lib/types";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleAddProductToCart = (product: Product) => {
    const cartProduct: Cart = {
      product: product,
      quantity: 1,
      selectedColor: product.colors[0] || "",
      selectedSize: product.sizes[0] || "",
    };

    dispatch(addProductToCart(cartProduct));
  };

  const handleGotoProduct = () => {
    console.log(product?._id);
    if (!product?._id) return;
    router.push(`/shop/${product._id}`);
  };

  return (
    <div className="space-y-2 cursor-pointer" onClick={handleGotoProduct}>
      <div
        className="group relative sm:h-[330px] h-[280px] rounded-t-[20px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${product?.images[0]?.link})`,
        }}
      >
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full flex justify-center px-3 mb-3 transition-all duration-500">
          <button
            className="cursor-pointer uppercase bg-purple-gradient text-white px-4 py-2 w-full rounded-3xl rounded-tl-2xl"
            onClick={(e) => {
              e.stopPropagation();
              handleAddProductToCart(product);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
      <p className="text-[#333333] text-sm font-georgia">{product.title}</p>
      <p className="text-[#333333] text-sm">${product.price}</p>
    </div>
  );
};

export default ProductCard;
