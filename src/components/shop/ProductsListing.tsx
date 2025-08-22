"use client";
import React, { Suspense, useMemo, useState, useEffect } from "react";
import Tabs from "../home/Tabs";
import ProductCard from "../common/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { productHooks } from "@/hooks/products/ProductHooks";
import PageLoader from "../common/PageLoader";
import { useRouter, useSearchParams } from "next/navigation";
import { categoryHooks } from "@/hooks/categories/CategoriesHooks";
import ProductCardSkeleton, {
  ProductGridSkeleton,
} from "../common/ProductCardSkeleton";

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
  const [currentPage, setCurrentPage] = useState(1);

  const selectedCategoryId = useMemo(
    () => searchParams.get("category"),
    [searchParams]
  );

  const { loading, products, totalPages } = productHooks.useGetAllProducts(
    currentPage,
    10,
    selectedCategoryId || "",
    searchTerm
  );

  const { loading: loadingCategories, categories } =
    categoryHooks.useGetAllCategories(1, 10);

  // Reset to page 1 when category or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryId, searchTerm]);

  const handleCategoryChange = (categoryId: string) => {
    router.push(`?category=${categoryId}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generatePageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show current page and 2 pages on each side
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <section className="relative sm:px-12 px-6 overflow-hidden">
      {/* Yellow Glow */}
      <div className="absolute z-10 left-1/3 -top-[200px] w-[700px] h-[700px] bg-multi-gradient opacity-50 rounded-full blur-[150px]" />

      {/* Bg Glows */}
      <div className="absolute z-10 -left-[300px] -bottom-12 w-[1400px] h-[1000px] bg-[var(--color-yellow)]/20 rounded-full blur-[120px]" />
      <div className="absolute z-10 -right-[300px] -bottom-12 w-[1400px] h-[1000px] bg-[var(--color-purple)]/20 rounded-full blur-[120px]" />

      <div className="relative z-10">
        {loadingCategories ? (
          ""
        ) : (
          <Tabs
            isShopPage
            tabs={categories}
            defaultActiveTabId={selectedCategoryId}
            onTabChange={handleCategoryChange}
          />
        )}
        {loading ? (
          <div className="my-6">
            <ProductGridSkeleton count={5} />
          </div>
        ) : !products || !products.length ? (
          <div className="w-full flex justify-center py-6">
            <p className="text-gray-400">No Product</p>
          </div>
        ) : (
          <div className="my-6 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[425px]:grid-cols-2 gap-x-3 gap-y-8">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}

        {/* Pagination - Only show if there are products and more than 1 page */}
        {products && products.length > 0 && totalPages > 1 && (
          <div className="w-full flex justify-center items-center gap-3 mb-10">
            {/* Previous Button */}
            <button
              onClick={() => canGoPrevious && handlePageChange(currentPage - 1)}
              disabled={!canGoPrevious || loading}
              className={`p-1 ${
                canGoPrevious
                  ? "cursor-pointer hover:bg-gray-100 rounded"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronLeft color={canGoPrevious ? "#979797" : "#d1d5db"} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center rounded-full overflow-hidden">
              {generatePageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-12 h-10 flex justify-center items-center transition-colors ${
                    page === currentPage
                      ? "bg-purple-gradient text-white"
                      : "bg-[#fdede6] hover:bg-[#f5d5c8] text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => canGoNext && handlePageChange(currentPage + 1)}
              disabled={!canGoNext || loading}
              className={`p-1 ${
                canGoNext
                  ? "cursor-pointer hover:bg-gray-100 rounded"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronRight color={canGoNext ? "#FC92EF" : "#d1d5db"} />
            </button>
          </div>
        )}

        {/* Page Info */}
        {!loading && products && products.length > 0 && (
          <div className="text-center text-sm text-gray-500 mb-6">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsListingWithSuspense;
