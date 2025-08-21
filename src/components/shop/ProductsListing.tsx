"use client";
import React, { Suspense, useMemo } from "react";
import Tabs from "../home/Tabs";
import ProductCard from "../common/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { productHooks } from "@/hooks/products/ProductHooks";
import PageLoader from "../common/PageLoader";
import { useRouter, useSearchParams } from "next/navigation";
import { categoryHooks } from "@/hooks/categories/CategoriesHooks";

const tabs = ["All", "Tops", "Bottoms", "Shoes", "Accessories", "Toys"];

const ProductsListingWithSuspense: React.FC<{ searchTerm: string }> = ({
  searchTerm,
}) => {
  return (
    <Suspense fallback="">
      <ProductsListing searchTerm={searchTerm} />
    </Suspense>
  );
};

const ProductsListing: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategoryId = useMemo(
    () => searchParams.get("category"),
    [searchParams]
  );

  const { loading, products } = productHooks.useGetAllProducts(
    1,
    10,
    selectedCategoryId || "",
    searchTerm
  );

  const { loading: loadingCategories, categories } =
    categoryHooks.useGetAllCategories(1, 10);

  if (loading || loadingCategories) return <PageLoader />;

  const handleCategoryChange = (categoryId: string) => {
    router.push(`?category=${categoryId}`, { scroll: false });
  };

  const pages: number[] = [1, 2, 3, 4, 5];
  return (
    <section className="relative sm:px-12 px-6 overflow-hidden">
      {/* Yellow Glow */}
      <div className="absolute z-10 left-1/3 -top-[200px] w-[700px] h-[700px] bg-multi-gradient opacity-50 rounded-full blur-[150px]" />

      {/* Bg Glows */}
      <div className="absolute z-10 -left-[300px] -bottom-12 w-[1400px] h-[1000px] bg-[var(--color-yellow)]/20 rounded-full blur-[120px]" />
      <div className="absolute z-10 -right-[300px] -bottom-12 w-[1400px] h-[1000px] bg-[var(--color-purple)]/20 rounded-full blur-[120px]" />
      {!products || !products.length ? (
        <div className="w-full flex justify-center py-6">
          <p className="text-gray-400">No Product</p>
        </div>
      ) : (
        <div className="relative z-10">
          <Tabs
            isShopPage
            tabs={categories}
            defaultActiveTabId={selectedCategoryId}
            onTabChange={handleCategoryChange}
          />

          <div className="mt-6 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[425px]:grid-cols-2 gap-x-3 gap-y-8">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <div className="w-full flex justify-center items-center gap-3 my-10">
            <ChevronLeft color="#979797" />
            <div className="flex items-center rounded-full overflow-hidden">
              {pages.map((page, index) => (
                <div
                  key={index}
                  className={`w-12 h-10 flex justify-center items-center bg-[#fdede6] ${
                    index === 0 ? "bg-purple-gradient text-white" : ""
                  }`}
                >
                  {page}
                </div>
              ))}
            </div>
            <ChevronRight color="#FC92EF" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsListingWithSuspense;
