import Image from "next/image";
import React from "react";
import YellowGlow from "../common/YellowGlow";
import { Search } from "lucide-react";

const ShopHero = () => {
  return (
    <div className="relative lg:mt-6 mt-16 overflow-hidden">
      {/* Yellow Glow */}
      <div className="absolute bottom-32 left-[20%] blur-[120px]">
        <div className="absolute z-10 w-[1000px] h-[605px] bg-[#fce7db] rounded-full blur-lg" />
      </div>
      <div className="relative z-20 grid md:grid-cols-3 items-center sm:mt-0 mt-6">
        <div className="">
          <Image
            src={"/images/shop1.png"}
            alt="Skylaboo"
            width={300}
            height={300}
            className="md:h-auto min-[520px]:h-full h-[100px] w-auto md:static absolute left-0 bottom-0 "
          />
        </div>
        <div className="relative z-30 flex justify-center items-center lg:mb-0 mb-6">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-georgia">Shop Now</h1>
            <p className="text-center my-3">
              Find the perfect outfit and essentials for every <br /> magical
              moment.
            </p>

            <div className="mt-3 flex items-center bg-white rounded-full sm:w-[350px] w-[90%] px-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full text-sm py-2 border-none outline-none"
              />
              <Search color="#5C5C5C" size={18} />
            </div>
          </div>
        </div>
        <div className="flex justify-end h-full">
          <Image
            src={"/images/shop2.png"}
            alt="Skylaboo"
            width={300}
            height={300}
            className="md:h-auto min-[520px]:h-full md:static absolute right-0 bottom-0 h-[100px] w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopHero;
