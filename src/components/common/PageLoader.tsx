import Image from "next/image";
import React from "react";

const PageLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <span className="h-auto w-auto mb-5">
          <Image
            src={"/images/logo.webp"}
            alt="Skylaboo"
            width={100}
            height={100}
          />
        </span>
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

export default PageLoader;
