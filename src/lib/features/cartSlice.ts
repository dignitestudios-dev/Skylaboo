import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, Product } from "../types";
import { utils } from "../utils";

interface InitialState {
  showCart: boolean;
  cartItems: Cart[];
}

// Initial state
const initialState: InitialState = {
  showCart: false,
  cartItems: utils.loadCartFromLocalStorage(),
};

// Create the user slice
const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleShowCart: (state, action: PayloadAction<boolean>) => {
      state.showCart = action.payload;
    },

    addProductToCart: (state, action: PayloadAction<Cart>) => {
      const existingProductIndex = state.cartItems.findIndex(
        (item) =>
          item.product._id === action.payload.product._id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      if (existingProductIndex !== -1) {
        state.cartItems[existingProductIndex].quantity +=
          action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }

      utils.saveCartToLocalStorage(state.cartItems);
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
      const productIndex = state.cartItems.findIndex(
        (item) =>
          item.product._id === action.payload.productId &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      if (productIndex !== -1) {
        if (action.payload.type === "inc") {
          state.cartItems[productIndex].quantity += 1;
        } else if (
          action.payload.type === "dec" &&
          state.cartItems[productIndex].quantity > 1
        ) {
          state.cartItems[productIndex].quantity -= 1;
        }
      }

      utils.saveCartToLocalStorage(state.cartItems);
    },
  },
});

// Export actions
export const { toggleShowCart, addProductToCart, updateCartProduct } =
  cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
