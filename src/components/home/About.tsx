import Image from "next/image";
import React from "react";
import PlayButton from "../icons/PlayButton";
import SectionHeading from "../common/SectionHeading";
import GradientArrow from "../icons/GradientArrow";
import Insta from "../icons/Insta";
import Linkedin from "../icons/Linkedin";
import Tiktok from "../icons/Tiktok";
import X from "../icons/X";
import Youtube from "../icons/Youtube";

const About = () => {
  return (
    <section id="about" className="p-12 relative overflow-hidden">
      {/* Yellow Glow */}
      <div className="absolute z-10 left-0 top-[10%] w-full h-[800px] bg-[#fae7dc]  rounded-full blur-[200px]" />

      <div className="relative z-20 grid grid-cols-2 gap-10 mb-10">
        <div className="flex justify-end items-center">
          <div
            className="relative bg-cover bg-center h-[600px] w-[550px] max-w-full rounded-3xl flex justify-center items-center"
            style={{
              backgroundImage: `url(/images/about.png)`,
            }}
          >
            <PlayButton />
            <div className="w-full absolute -bottom-12 left-0 flex justify-center">
              <div className="text-white px-10 py-8 bg-multi-gradient rounded-[50px] rounded-tl-2xl shadow-[0px_10px_35px_0px_#A8A8A880]">
                <p className="font-georgia text-xl">
                  Dress Them Happy, Dress Them Skylaboo
                </p>
                <p className="font-georgia">@skylaboo</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-12">
          <div className="space-y-5">
            <SectionHeading title1="About" title2="Skylaboo" />
            <p className="text-lg text-black">
              At Skylaboo, we believe every child deserves style, comfort, and a
              touch of magic. We’re a dedicated kids’ clothing and essentials
              store, bringing you thoughtfully curated outfits, accessories, and
              more{" "}
            </p>
            <p className="text-lg !text-[#222222] font-light">
              All crafted with love, safety, and fun in mind. From playful
              everyday wear to special occasion outfits, Skylaboo makes shopping
              for your little ones simple, joyful, and inspiring.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <p className="font-bold text-[var(--color-purple)]">Lets connect</p>

            <GradientArrow />

            <div className="rounded-full border border-[var(--color-yellow)] p-5 w-fit">
              <div className="flex items-center gap-5">
                <div className="rounded-full bg-multi-gradient h-[50px] w-[50px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[45px] w-[45px] flex justify-center items-center">
                    <Insta />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient h-[50px] w-[50px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[45px] w-[45px] flex justify-center items-center">
                    <Linkedin />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient h-[50px] w-[50px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[45px] w-[45px] flex justify-center items-center">
                    <Tiktok />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient h-[50px] w-[50px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[45px] w-[45px] flex justify-center items-center">
                    <X />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient h-[50px] w-[50px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[45px] w-[45px] flex justify-center items-center">
                    <Youtube />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
