export interface Product {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number;
  price: number;
  images: {
    link: string;
    isFeatured: boolean;
  }[];
  category: string;
  isFeatured: string;
  isActive: string;
  isDeleted: string;
}

interface DeliveryDetails {
  countryOrRegion: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface Cart {
  quantity: number;
  price: number;
  selectedColor: string;
  selectedSize: string;
  product: Product;
  isDelivery: boolean;
  delivery: DeliveryDetails;
}
