import React from "react";

const PlayButton = () => {
  return (
    <svg
      width={100}
      height={100}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={100} height={100} rx={50} fill="white" fillOpacity="0.2" />
      <circle cx={50} cy={50} r={35} fill="url(#paint0_linear_439_11554)" />
      <path
        d="M42 50.0004V46.4404C42 42.0204 45.13 40.2104 48.96 42.4204L52.05 44.2004L55.14 45.9804C58.97 48.1904 58.97 51.8104 55.14 54.0204L52.05 55.8004L48.96 57.5804C45.13 59.7904 42 57.9804 42 53.5604V50.0004Z"
        stroke="white"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_439_11554"
          x1="7.86538"
          y1="11.7974"
          x2="97.4841"
          y2="19.2281"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7B0FB" />
          <stop offset={1} stopColor="#FF82E9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PlayButton;
