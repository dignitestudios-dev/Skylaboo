import { defaultCart } from "./constants";
import { Cart } from "./types";

const isBrowser = typeof window !== "undefined";

const loadCartFromLocalStorage = (): Cart => {
  if (isBrowser) {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : defaultCart;
  }
  return defaultCart;
};

const saveCartToLocalStorage = (cart: Cart) => {
  if (isBrowser) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const utils = {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
};
