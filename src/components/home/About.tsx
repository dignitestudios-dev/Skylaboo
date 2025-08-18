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
    <section id="about" className="sm:p-12 p-6 relative overflow-hidden">
      {/* Yellow Glow */}
      <div className="absolute z-10 left-0 top-[10%] w-full h-[800px] bg-[#fae7dc]  rounded-full blur-[200px]" />

      <div className="relative z-20 grid md:grid-cols-2 gap-10 mb-10">
        <div className="flex md:justify-end justify-center items-center md:mb-0 mb-10">
          <div
            className="relative bg-cover bg-center sm:h-[600px] min-[375px]:h-[300px] h-[240px] sm:w-[550px] w-full max-w-full rounded-3xl flex justify-center items-center"
            style={{
              backgroundImage: `url(/images/about.png)`,
            }}
          >
            <PlayButton />
            <div className="w-full absolute -bottom-12 left-0 flex justify-center">
              <div className="max-w-[90%] text-white sm:px-10 px-5 sm:py-8 py-4 bg-multi-gradient sm:rounded-[50px] rounded-[32px] rounded-tl-2xl shadow-[0px_10px_35px_0px_#A8A8A880]">
                <p className="font-georgia text-xl">
                  Dress Them Happy, Dress Them Skylaboo
                </p>
                <p className="font-georgia">@skylaboo</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center sm:gap-12 gap-6">
          <div className="space-y-5">
            <SectionHeading title1="About" title2="Skylaboo" />
            <p className="lg:text-lg text-black md:text-left text-center">
              At Skylaboo, we believe every child deserves style, comfort, and a
              touch of magic. We’re a dedicated kids’ clothing and essentials
              store, bringing you thoughtfully curated outfits, accessories, and
              more{" "}
            </p>
            <p className="lg:text-lg !text-[#222222] font-light md:text-left text-center">
              All crafted with love, safety, and fun in mind. From playful
              everyday wear to special occasion outfits, Skylaboo makes shopping
              for your little ones simple, joyful, and inspiring.
            </p>
          </div>

          <div className="flex lg:flex-row flex-col lg:items-center gap-3">
            <div className="flex items-center gap-3">
              <p className="font-bold text-[var(--color-purple)]">
                Lets connect
              </p>

              <GradientArrow />
            </div>

            <div className="rounded-full border border-[var(--color-yellow)] lg:p-5 p-3 w-fit">
              <div className="flex items-center min-[375px]:gap-5 gap-2">
                <div className="rounded-full bg-multi-gradient lg:h-[50px] lg:w-[50px] h-[42px] w-[42px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] lg:h-[45px] lg:w-[45px] h-[37px] w-[37px] flex justify-center items-center">
                    <Insta />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient lg:h-[50px] lg:w-[50px] h-[42px] w-[42px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] lg:h-[45px] lg:w-[45px] h-[37px] w-[37px] flex justify-center items-center">
                    <Linkedin />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient lg:h-[50px] lg:w-[50px] h-[42px] w-[42px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] lg:h-[45px] lg:w-[45px] h-[37px] w-[37px] flex justify-center items-center">
                    <Tiktok />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient lg:h-[50px] lg:w-[50px] h-[42px] w-[42px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] lg:h-[45px] lg:w-[45px] h-[37px] w-[37px] flex justify-center items-center">
                    <X />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient lg:h-[50px] lg:w-[50px] h-[42px] w-[42px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] lg:h-[45px] lg:w-[45px] h-[37px] w-[37px] flex justify-center items-center">
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
