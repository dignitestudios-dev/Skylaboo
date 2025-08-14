import { Cart } from "./types";

const isBrowser = typeof window !== "undefined";

const loadCartFromLocalStorage = (): Cart[] => {
  if (isBrowser) {
    const cart = localStorage.getItem("cartItems");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const saveCartToLocalStorage = (cartItems: Cart[]) => {
  if (isBrowser) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

export const utils = {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
};
