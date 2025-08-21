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
      phone: "",
    },
    shippingCost: 0,
  };