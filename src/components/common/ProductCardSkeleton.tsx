"use client";
import { Image } from "lucide-react";
import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="space-y-2 animate-pulse">
      {/* Image skeleton */}
      <div className="sm:h-[330px] h-[280px] rounded-t-[20px] bg-white/50 relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]"></div>

        {/* Mock image placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image size={32} className="text-gray-300" />
        </div>
      </div>

      {/* Title skeleton */}
      <div className="space-y-1">
        <div className="h-4 bg-white/50 rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
        </div>
        <div className="h-4 bg-white/50 rounded w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>

      {/* Price skeleton */}
      <div className="h-4 bg-white/50 rounded w-1/3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

// Grid of skeleton cards component for convenience
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({
  count = 10,
}) => {
  return (
    <div className="mt-6 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 min-[425px]:grid-cols-2 gap-x-3 gap-y-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
