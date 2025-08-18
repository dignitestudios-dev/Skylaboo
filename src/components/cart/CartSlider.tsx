"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useMemo } from "react";
import CartProduct from "./CartProduct";
import { Cart } from "@/lib/types";
import { utils } from "@/lib/utils";
import { X } from "lucide-react";
import { toggleShowCart } from "@/lib/features/cartSlice";
import Link from "next/link";

const cartDummyData: Cart[] = [
  {
    product: {
      _id: "123",
      title: "Stylish Shirt",
      subtitle: "Comfortable and trendy",
      description: "A stylish shirt made from high-quality fabric.",
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L"],
      stock: 10,
      price: 25,
      images: [
        {
          link: "/images/products/1.png",
          isFeatured: true,
        },
        {
          link: "/images/products/1.png",
          isFeatured: false,
        },
      ],
      category: "Clothing",
      isFeatured: "true",
      isActive: "true",
      isDeleted: "false",
    },
    quantity: 2,
    price: 25,
    selectedColor: "Blue",
    selectedSize: "3-9",
  },
  {
    product: {
      _id: "1234",
      title: "Elegant Dress",
      subtitle: "Perfect for special occasions",
      description: "An elegant dress with a modern design.",
      colors: ["Red", "Pink"],
      sizes: ["M", "L"],
      stock: 5,
      price: 50,
      images: [
        {
          link: "/images/products/2.png",
          isFeatured: true,
        },
        {
          link: "/images/products/2.png",
          isFeatured: false,
        },
      ],
      category: "Clothing",
      isFeatured: "true",
      isActive: "true",
      isDeleted: "false",
    },
    quantity: 1,
    price: 50,
    selectedColor: "Red",
    selectedSize: "3-5",
  },
  {
    product: {
      _id: "12345",
      title: "Running Shoes",
      subtitle: "Comfortable and durable",
      description: "High-quality running shoes for everyday use.",
      colors: ["Black", "White"],
      sizes: ["40", "42", "44"],
      stock: 8,
      price: 75,
      images: [
        {
          link: "/images/products/3.png",
          isFeatured: true,
        },
        {
          link: "/images/products/3.png",
          isFeatured: false,
        },
      ],
      category: "Footwear",
      isFeatured: "true",
      isActive: "true",
      isDeleted: "false",
    },
    quantity: 1,
    price: 75,
    selectedColor: "Black",
    selectedSize: "1-3",
  },
  {
    product: {
      _id: "123456",
      title: "Leather Wallet",
      subtitle: "Stylish and practical",
      description: "A premium leather wallet with multiple compartments.",
      colors: ["Brown", "Black"],
      sizes: ["One Size"],
      stock: 15,
      price: 30,
      images: [
        {
          link: "/images/products/4.png",
          isFeatured: true,
        },
        {
          link: "/images/products/4.png",
          isFeatured: false,
        },
      ],
      category: "Accessories",
      isFeatured: "true",
      isActive: "true",
      isDeleted: "false",
    },
    quantity: 1,
    price: 30,
    selectedColor: "Brown",
    selectedSize: "12-18",
  },
  {
    product: {
      _id: "123456",
      title: "Smart Watch",
      subtitle: "Advanced features and sleek design",
      description: "A smart watch with multiple functionalities.",
      colors: ["Silver", "Black"],
      sizes: ["Adjustable"],
      stock: 3,
      price: 150,
      images: [
        {
          link: "/images/products/5.png",
          isFeatured: true,
        },
        {
          link: "/images/products/5.png",
          isFeatured: false,
        },
      ],
      category: "Electronics",
      isFeatured: "true",
      isActive: "true",
      isDeleted: "false",
    },
    quantity: 1,
    price: 150,
    selectedColor: "Silver",
    selectedSize: "6-9",
  },
];

const CartSlider = () => {
  const dispatch = useAppDispatch();
  const { showCart, cartItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    utils.saveCartToLocalStorage(cartDummyData);
  }, []);

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
          <div className="w-full flex justify-between items-center gap-10 mb-8 sm:px-12 min-[425px]:min-[425px]:px-6 px-3 px-3">
            <p className="sm:text-3xl text-xl font-georgia">
              Cart
              <span className="gradient-text font-georgia font-black sm:ms-2 ms-1">
                ({cartItems.length})
              </span>
            </p>
            <button className="cursor-pointer" onClick={handleHideCart}>
              <X />
            </button>
          </div>

          <div className="sm:px-12 min-[425px]:px-6 px-3">
            {cartItems.map((cartItem, index) => (
              <div key={index}>
                <CartProduct cartItem={cartItem} />
              </div>
            ))}
          </div>

          <div className="mt-12 py-6 border-y border-[#00000033] sm:px-12 min-[425px]:px-6 px-3">
            <div className="w-full flex justify-between items-center gap-10">
              <p className="text-sm font-bold">SUBTOTAL</p>

              <p className="font-bold">${subtotal}</p>
            </div>
            <p className="text-sm font-extralight text-[#333333] mt-2">
              SHIPPING & TAXES CALCULATED AT CHECKOUT
            </p>
          </div>

          <div className="sm:px-12 min-[425px]:px-6 px-3">
            <Link href={"/checkout"} onClick={handleHideCart} className="w-full">
              <button className="uppercase font-bold cursor-pointer text-white rounded-3xl rounded-tl-2xl w-full bg-multi-gradient mt-6 py-4 tracking-wider">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CartSlider;
