import React from "react";

const GradientArrow = () => {
  return (
    <svg
      width={41}
      height={12}
      viewBox="0 0 41 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_663_10419)">
        <path
          d="M1 5.00007C0.447715 5.00007 0 5.44779 0 6.00007C0 6.55235 0.447715 7.00007 1 7.00007V5.00007ZM41 6.00007L31 0.226562V11.7736L41 6.00007ZM1 6.00007V7.00007H32V6.00007V5.00007H1V6.00007Z"
          fill="url(#paint0_linear_663_10419)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_663_10419"
          x1="-3.07692"
          y1="5.95432"
          x2="1.22"
          y2="20.2056"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EBC501" />
          <stop offset={1} stopColor="#FF82E9" />
        </linearGradient>
        <clipPath id="clip0_663_10419">
          <rect width={41} height={12} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GradientArrow;
