"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import CartProduct from "./CartProduct";
import { Cart } from "@/lib/types";
import { utils } from "@/lib/utils";

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
  const { showCart, cartItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    utils.saveCartToLocalStorage(cartDummyData);
  }, []);

  return (
    <aside
      className={`fixed top-0 ${
        true ? "right-0" : "right-[-100%]"
      } z-50 h-full w-[720px] max-w-[90%] overflow-y-auto transition-all duration-500`}
    >
      <div className="bg-white min-h-full w-full p-12">
        {cartItems.map((cartItem, index) => (
          <div key={index}>
            <CartProduct cartItem={cartItem} />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CartSlider;
