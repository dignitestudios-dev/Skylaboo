"use client";
import SectionHeading from "../common/SectionHeading";
import ProductCard from "../common/ProductCard";
import Tabs from "./Tabs";
import Link from "next/link";
import { categoryHooks } from "@/hooks/categories/CategoriesHooks";
import { productHooks } from "@/hooks/products/ProductHooks";
import SectionLoader from "../common/SectionLoader";
import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ShopNowWithSuspense = () => {
  return (
    <Suspense fallback={""}>
      <ShopNow />
    </Suspense>
  );
};

const ShopNow = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategoryId = useMemo(
    () => searchParams.get("category"),
    [searchParams]
  );

  const { loading, products } = productHooks.useGetAllProducts(
    1,
    10,
    selectedCategoryId || ""
  );

  const { loading: loadingCategories, categories } =
    categoryHooks.useGetAllCategories(1, 10);

  const handleCategoryChange = (categoryId: string) => {
    router.push(`?category=${categoryId}`, { scroll: false });
  };

  return (
    <section className="sm:px-12 px-6 py-6 relative">
      {/* Yellow Glow */}
      <div className="absolute z-10 left-[20%] -top-[200px] w-[700px] h-[700px] bg-[var(--color-yellow)]/20 rounded-full blur-[150px]" />

      <div className="relative z-20">
        <div className="w-full flex flex-col gap-3 items-center justify-center">
          <SectionHeading title1="Shop" title2="Now" />{" "}
          <p className="text-center text-black/65 text-sm">
            Find the perfect outfit and essentials for every magical moment.{" "}
          </p>
        </div>

        {loading || loadingCategories ? (
          <SectionLoader />
        ) : !products || !products.length ? (
          <div className="w-full flex justify-center py-6">
            <p className="text-gray-500">No Products</p>
          </div>
        ) : (
          <>
            <Tabs
              tabs={categories}
              defaultActiveTabId={selectedCategoryId}
              onTabChange={handleCategoryChange}
            />

            <div className="mt-6 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[425px]:grid-cols-2 gap-x-3 gap-y-8">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>

            <div className="w-full flex justify-center px-3 mt-6">
              <Link href={"/shop"}>
                <button className="cursor-pointer uppercase bg-purple-gradient text-white px-4 py-2 w-[190px] max-w-full rounded-3xl rounded-tl-2xl">
                  View all
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="overflow-hidden absolute w-full h-full bottom-0 left-0">
        <div className="absolute z-10 -left-[300px] bottom-0 w-[70%] h-[400px] bg-[var(--color-yellow)]/30 rounded-full blur-[100px]" />
        <div className="absolute z-10 -right-[300px] bottom-0 w-[70%] h-[400px] bg-[var(--color-purple)]/30 rounded-full blur-[100px]" />
      </div>
    </section>
  );
};

export default ShopNowWithSuspense;
