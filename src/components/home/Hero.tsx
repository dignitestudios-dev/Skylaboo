import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full min-h-[95vh] flex items-center bg-gradient-to-b from-transparent to-[#e9e2d4] sm:px-12 px-6 ">
      <div className="w-full h-full relative lg:block flex flex-col justify-center items-center gap-10">
        <div className="space-y-5 relative z-20 lg:block lg:mt-0 mt-24">
          <h2 className="font-georgia min-[540px]:text-[52px] min-[380px]:text-[40px] text-[36px] min-[540px]:leading-[62px] min-[380px]:leading-[50px] leading-[40px]">
            Kids Summer{" "}
            <span className="gradient-text font-georgia font-black">2025</span>{" "}
            <br className="sm:block hidden" />
            Delivery II
          </h2>
          <p className="text-sm">
            Explore the second iteration of Women Summer 2025, highlighted{" "}
            <br className="min-[540px]:block hidden" /> by collaborations with PUMA and AKILA.
          </p>
          <div className="lg:block flex justify-center">
            <button className="uppercase purple-btn">Shop now</button>
          </div>
        </div>

        <Image
          src={"/images/hero1.png"}
          alt="Skylaboo"
          width={1200}
          height={1200}
          className="lg:absolute -top-52 right-0 z-10 lg:w-[900px] w-[500px]"
        />
      </div>
    </section>
  );
};

export default Hero;
