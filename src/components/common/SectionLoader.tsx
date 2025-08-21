import Image from "next/image";
import React from "react";

const SectionLoader = () => {
  return (
    <div className="h-52 w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="loader-logo">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionLoader;
