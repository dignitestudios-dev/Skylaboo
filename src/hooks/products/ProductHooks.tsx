"use client";
import { api } from "@/lib/services";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";

const useGetAllProducts = (page: number, limit: number, categoryId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const resposne = await api.getAllProducts(page, limit, categoryId);
      setProducts(resposne.data);
      setTotalPages(resposne.pagination.totalPages);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [page, limit, categoryId]);

  return {
    loading,
    products,
    totalPages,
  };
};

const useGetProductById = (id: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);

  const getAllProducts = async (id: string) => {
    setLoading(true);
    try {
      const resposne = await api.getProductById(id);
      setProduct(resposne.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts(id);
  }, [id]);

  return {
    loading,
    product,
  };
};

export const productHooks = {
  useGetAllProducts,
  useGetProductById,
};
