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

export interface Cart {
  quantity: number;
  price: number;
  selectedColor: string;
  selectedSize: string;
  product: Product;
}
