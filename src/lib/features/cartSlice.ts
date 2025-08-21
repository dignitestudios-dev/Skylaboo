import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartProduct, Product } from "../types";
import { utils } from "../utils";
import toast from "react-hot-toast";

interface InitialState {
  showCart: boolean;
  cart: Cart;
}

// Initial state
const initialState: InitialState = {
  showCart: false,
  cart: utils.loadCartFromLocalStorage(),
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleShowCart: (state, action: PayloadAction<boolean>) => {
      state.showCart = action.payload;
    },

    setOrderType: (state, action: PayloadAction<"delivery" | "pickup">) => {
      state.cart.orderType = action.payload;
      utils.saveCartToLocalStorage(state.cart);
    },

    addProductToCart: (state, action: PayloadAction<CartProduct>) => {
      const existingProductIndex = state.cart.products.findIndex(
        (item) =>
          item.product._id === action.payload.product._id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      if (existingProductIndex !== -1) {
        // Product already exists in cart - show toast message instead of adding
        toast.error("Already in the cart");
      } else {
        // Add new product to cart
        state.cart.products.push(action.payload);
        utils.saveCartToLocalStorage(state.cart);
        toast.success(
          `'${action.payload?.product?.title || "Product"}' added to cart`
        );
      }
    },

    removeProductFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedColor: string;
        selectedSize: string;
      }>
    ) => {
      const productIndex = state.cart.products.findIndex(
        (item) =>
          item.product._id === action.payload.productId &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      if (productIndex !== -1) {
        state.cart.products.splice(productIndex, 1);
        toast.success(
          `'${
            state.cart.products[productIndex]?.product?.title || "Product"
          }' removed from cart`
        );
        utils.saveCartToLocalStorage(state.cart);
      }
    },

    updateCartProduct: (
      state,
      action: PayloadAction<{
        type: "inc" | "dec";
        productId: string;
        selectedColor: string;
        selectedSize: string;
      }>
    ) => {
      const productIndex = state.cart.products.findIndex(
        (item) =>
          item.product._id === action.payload.productId &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      if (productIndex !== -1) {
        if (action.payload.type === "inc") {
          state.cart.products[productIndex].quantity += 1;
        } else if (
          action.payload.type === "dec" &&
          state.cart.products[productIndex].quantity > 1
        ) {
          state.cart.products[productIndex].quantity -= 1;
        }
        utils.saveCartToLocalStorage(state.cart);
      }
    },

    clearCart: (state) => {
      state.cart = { ...state.cart, products: [] };
      toast.success("Cart cleared");
      utils.saveCartToLocalStorage(state.cart);
    },
  },
});

// Export actions
export const {
  toggleShowCart,
  setOrderType,
  addProductToCart,
  removeProductFromCart,
  updateCartProduct,
  clearCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
