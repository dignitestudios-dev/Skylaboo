"use client";
import { api } from "@/lib/services";
import { Category, Product } from "@/lib/types";
import { useEffect, useState } from "react";

const useGetAllCategories = (page: number, limit: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const resposne = await api.getAllCategories(page, limit);
      setCategories(resposne.data);
      setTotalPages(resposne.pagination.totalPages);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [page, limit]);

  return {
    loading,
    categories,
    totalPages,
  };
};

export const categoryHooks = {
  useGetAllCategories,
};
