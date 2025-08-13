import { Cart } from "./types";

const loadCartFromLocalStorage = (): Cart[] => {
  const cart = localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : [];
};

const saveCartToLocalStorage = (cartItems: Cart[]) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const utils = {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
};
