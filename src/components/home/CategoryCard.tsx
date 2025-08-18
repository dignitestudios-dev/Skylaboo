import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image }) => {
  return (
    <div
      className={`relative overflow-hidden ${
        title === "Toys"
          ? "bg-[var(--color-purple)]/20"
          : "bg-[var(--color-purple)]/10"
      } md:rounded-t-[50px] md:rounded-b-[24px] rounded-t-[32px] rounded-b-[12px] md:p-10 p-5`}
    >
      <h4 className="lg:text-3xl md:text-2xl sm:text-xl font-sans-bold">{title}</h4>

      <div className="absolute bottom-0 left-0 w-full flex justify-center max-h-full">
        <Image
          src={`/images/${image}`}
          alt={title}
          width={400}
          height={400}
          className={`sm:max-w-[90%] w-auto sm:h-auto h-full max-h-full`}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
