import { Cart } from "./types";

export const defaultCart: Cart = {
  products: [],
  contact: {
    email: "",
  },
  orderType: "delivery",
  delivery: {
    country: "",
    city: "",
    address: "",
    apartment: "",
    postalCode: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  },
  shippingCost: 0,
  pickupAddress: "",
};
