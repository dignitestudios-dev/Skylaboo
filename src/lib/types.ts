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
  phone: string;
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
