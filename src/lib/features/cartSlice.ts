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

    updateShippingCostAndPickupAddress: (
      state,
      action: PayloadAction<{ shippingCost: number; pickupAddress: string }>
    ) => {
      state.cart.pickupAddress = action.payload.pickupAddress;
      utils.saveCartToLocalStorage(state.cart);
    },

    updateContactEmail: (state, action: PayloadAction<string>) => {
      state.cart.contact.email = action.payload;
      utils.saveCartToLocalStorage(state.cart);
    },

    updateDeliveryDetails: (
      state,
      action: PayloadAction<
        Partial<{
          country: string;
          city: string;
          address: string;
          apartment: string;
          postalCode: string;
          firstName: string;
          lastName: string;
          phoneNumber: string;
        }>
      >
    ) => {
      state.cart.delivery = {
        ...state.cart.delivery,
        ...action.payload,
      };
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
        toast.error("Already in the cart");
      } else {
        state.cart.products.push(action.payload);

        // ✅ Add shipping cost only if this product (by _id) is new in the cart
        const isProductAlreadyInCart = state.cart.products.some(
          (item, idx) =>
            idx !== state.cart.products.length - 1 && // ignore the one we just pushed
            item.product._id === action.payload.product._id
        );

        if (!isProductAlreadyInCart) {
          const productShippingCost = action.payload.product.shippingCost || 0;
          state.cart.shippingCost =
            (state.cart.shippingCost || 0) + productShippingCost;
        }

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
        const removedProduct = state.cart.products[productIndex];
        state.cart.products.splice(productIndex, 1);

        // ✅ Check if this was the last variant of that product
        const isProductStillInCart = state.cart.products.some(
          (item) => item.product._id === removedProduct.product._id
        );

        if (!isProductStillInCart) {
          const productShippingCost = removedProduct.product.shippingCost || 0;
          state.cart.shippingCost =
            (state.cart.shippingCost || 0) - productShippingCost;
        }

        toast.success(
          `'${removedProduct?.product?.title || "Product"}' removed from cart`
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
      state.cart = { ...state.cart, products: [], shippingCost: 0 }; // ✅ reset shipping cost
      utils.saveCartToLocalStorage(state.cart);
    },
  },
});

// Export actions
export const {
  toggleShowCart,
  setOrderType,
  updateShippingCostAndPickupAddress,
  updateContactEmail,
  updateDeliveryDetails,
  addProductToCart,
  removeProductFromCart,
  updateCartProduct,
  clearCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
