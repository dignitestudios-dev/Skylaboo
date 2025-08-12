import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full min-h-[95vh] flex items-center bg-gradient-to-b from-transparent to-[#e9e2d4] px-12">
      <div className="w-full h-full relative">
        <div className="space-y-5">
          <h2 className="font-georgia text-[52px] leading-[62px]">
            Kids Summer{" "}
            <span className="gradient-text font-georgia font-black">2025</span>{" "}
            <br />
            Delivery II
          </h2>
          <p className="text-sm">
            Explore the second iteration of Women Summer 2025, highlighted{" "}
            <br /> by collaborations with PUMA and AKILA.
          </p>
          <button className="uppercase purple-btn">Shop now</button>
        </div>

        <Image
          src={"/images/hero1.png"}
          alt="Skylaboo"
          width={1200}
          height={1200}
          className="absolute -top-52 right-0 w-[900px]"
        />
      </div>
    </section>
  );
};

export default Hero;
