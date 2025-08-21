import axios from "axios";
import { Category, Pagination, Product } from "./types";

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

const getAllCategories = (
  page: number = defaultPage,
  limit: number = defaultLimit
) =>
  apiHandler<{
    data: Category[];
    message: string;
    pagination: Pagination;
  }>(() => API.get(`/category?page=${page}&limit=${limit}`));

export const api = { getAllProducts, getProductById, getAllCategories };
