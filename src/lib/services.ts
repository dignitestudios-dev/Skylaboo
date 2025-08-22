import axios from "axios";
import { AppConfigs, Category, OrderData, Pagination, Product } from "./types";

// Create an Axios instance
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  withCredentials: true,
  timeout: 10000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// default page and limit
const defaultPage = 1;
const defaultLimit = 20;

// Centralized API Handling functions start
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    console.error("API Error:", errorMessage);
    throw new Error(errorMessage);
  }
  throw new Error(
    (error as any).message || error || "An Unexpected error occurred"
  );
};

const handleApiResponse = (response: any) => {
  const responseData = response.data;

  // Check if success is false and throw an error
  if (!responseData.success) {
    throw new Error(
      responseData.message || "Something went wrong, Please try again!"
    );
  }

  return responseData; // Only return the response data {status, message, data}
};

const apiHandler = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    const response = await apiCall();
    return handleApiResponse(response);
  } catch (error) {
    throw handleApiError(error);
  }
};

// Centralized API Handling functions end

// Products API
const getAllProducts = (
  page: number = defaultPage,
  limit: number = defaultLimit,
  categoryId: string,
  searchTerm: string
) =>
  apiHandler<{
    data: Product[];
    message: string;
    pagination: Pagination;
  }>(() =>
    API.get(
      `/product?page=${page}&limit=${limit}&categoryId=${categoryId}&search=${searchTerm}`
    )
  );

const getProductById = (id: string) =>
  apiHandler(() => API.get(`/product/${id}`));

// Categories API
const getAllCategories = (
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    data: Category[];
    message: string;
    pagination: Pagination;
  }>(() => API.get(`/category?page=${page}&limit=${limit}`));

// App Configs API
const getAppConfigs = () =>
  apiHandler<{ data: AppConfigs; message: string }>(() =>
    API.get("/global/config")
  );

// Order API
const createOrder = (orderData: {
  products: Array<{
    product: string;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
  }>;
  contact: {
    email: string;
  };
  delivery?: {
    country?: string;
    city?: string;
    address?: string;
    apartment?: string;
    postalCode?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  };
  orderType: "delivery" | "pickup";
  shippingCost: number;
  pickupAddress?: string;
  paymentMethodId: string;
}) =>
  apiHandler<{
    data: OrderData;
    message: string;
    success: boolean;
  }>(() => API.post("/order", orderData));

export const api = {
  getAllProducts,
  getProductById,
  getAllCategories,
  getAppConfigs,
  createOrder,
};
