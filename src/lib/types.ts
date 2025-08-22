export interface Product {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  colors: string[];
  sizes: string[];
  price: number;
  images: {
    link: string;
    isFeatured: boolean;
  }[];
  category: string;
  isFeatured: string;
  isActive: string;
  isDeleted: string;
  receivingOptions: ("delivery" | "pickup")[];
}

interface DeliveryDetails {
  country: string;
  city: string;
  address: string;
  apartment: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface CartProduct {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Cart {
  products: CartProduct[];
  contact: {
    email: string;
  };
  orderType: "delivery" | "pickup";
  delivery: DeliveryDetails;
  pickupAddress: string;
  shippingCost: number;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface Category {
  _id: string;
  name: string;
}

export interface AppConfigs {
  shippingCost: number;
  pickupAddress: string;
}

export interface OrderData {
  createdAt: string;
  contact: {
    email: string;
  };
  delivery?: DeliveryDetails;
  orderType: "delivery" | "pickup";
  pickupAddress: string;
  products: CartProduct[];
  shortCode: string;
  shippingCost: number;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  clientSecret: string;
  paymentIntentId: string;
}
