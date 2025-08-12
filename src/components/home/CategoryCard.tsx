import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image }) => {
  return (
    <div
      className={`relative ${
        title === "Toys"
          ? "bg-[var(--color-purple)]/20"
          : "bg-[var(--color-purple)]/10"
      } rounded-t-[50px] rounded-b-[24px] p-10`}
    >
      <h4 className="text-3xl font-sans-bold">{title}</h4>

      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        <Image
          src={`/images/${image}`}
          alt={title}
          width={400}
          height={400}
          className={`max-w-[90%]`}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
