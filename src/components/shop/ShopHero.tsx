import Image from "next/image";
import React from "react";
import YellowGlow from "../common/YellowGlow";
import { Search } from "lucide-react";

const ShopHero = () => {
  return (
    <div className="relative mt-6 overflow-hidden">
      {/* Yellow Glow */}
      <div className="absolute bottom-32 left-[20%] blur-[120px]">
        <div className="absolute z-10 w-[1000px] h-[605px] bg-[#fce7db] rounded-full blur-lg" />
      </div>
      <div className="relative z-20 grid grid-cols-3 items-center ">
        <div>
          <Image
            src={"/images/shop1.png"}
            alt="Skylaboo"
            width={300}
            height={300}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-georgia">Shop Now</h1>
            <p className="text-center my-3">
              Find the perfect outfit and essentials for every <br /> magical
              moment.
            </p>

            <div className="mt-3 flex items-center bg-white rounded-full w-[350px] px-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full text-sm py-2 border-none outline-none"
              />
              <Search color="#5C5C5C" size={18} />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Image
            src={"/images/shop2.png"}
            alt="Skylaboo"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopHero;
