"use client";
import React, { useEffect, useState } from "react";
import PlayButton from "../icons/PlayButton";
import Image from "next/image";
import Insta from "../icons/Insta";
import Linkedin from "../icons/Linkedin";
import Tiktok from "../icons/Tiktok";
import X from "../icons/X";
import Youtube from "../icons/Youtube";
import Link from "next/link";

const WelcomeModal = () => {
  const [show, setShow] = useState(false);
  const [showDelay, setShowDelay] = useState(false);

  useEffect(() => {
    setShowDelay(true);
    setTimeout(() => {
      setShow(true);
    }, 300);
  }, []);

  const handleHide = () => {
    setShow(false);
    setTimeout(() => {
      setShowDelay(false);
    }, 300);
  };

  return (
    <>
      {/* Dull Background */}
      <div
        onClick={handleHide}
        className={`fixed top-0 ${show ? "opacity-100" : "opacity-0"} ${
          showDelay ? "block" : "hidden"
        } left-0 z-40 w-full h-screen bg-black/20 transition-all duration-700 overflow-auto`}
      />
      <div
        onClick={handleHide}
        className={`flex justify-center lg:items-center fixed ${
          show ? "top-0" : "-top-[100%]"
        } left-0 z-50 w-full h-screen transition-all duration-500 py-10 overflow-auto`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white sm:p-5 p-3 grid md:grid-cols-2 gap-5 rounded-4xl h-fit w-[80%]"
        >
          <div
            className="relative bg-cover bg-center md:h-full h-[320px] max-w-full rounded-3xl flex justify-center items-center"
            style={{
              backgroundImage: `url(/images/about.png)`,
            }}
          >
            <PlayButton />
          </div>
          <div className="flex flex-col gap-5 justify-center items-center md:px-6 px-0">
            <Image
              src={"/images/welcome.png"}
              alt="Welcome"
              width={120}
              height={120}
            />
            <p className="font-sans-bold text-[var(--color-purple)] text-[28px] text-center">
              Welcome to the Skylaboo Family!
            </p>
            <p className="text-[#5C5C5C] text-center">
              We’re so happy to have you here! we believe every child deserves
              to shine in style. From adorable clothes to fun accessories and
              comfy shoes, we handpick everything with love and care — just for
              your little stars.
            </p>
            <p className="text-center">
              Thank you for joining us on this journey. Let’s make every moment
              fashionable and fun — together! 💫✨
            </p>

            <Link href={"#about"} className="w-full">
              <button
                onClick={() => setShow(false)}
                className="cursor-pointer w-full py-3 bg-multi-gradient text-white rounded-full"
              >
                About Us
              </button>
            </Link>

            <div>
              <div className="flex items-center sm:justify-start justify-center sm:gap-5 gap-2 md:flex-nowrap flex-wrap">
                <div className="rounded-full bg-multi-gradient h-[45px] w-[45px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[40px] w-[40px] flex justify-center items-center">
                    <Insta />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient h-[45px] w-[45px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[40px] w-[40px] flex justify-center items-center">
                    <Linkedin />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient h-[45px] w-[45px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[40px] w-[40px] flex justify-center items-center">
                    <Tiktok />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient h-[45px] w-[45px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[40px] w-[40px] flex justify-center items-center">
                    <X />
                  </div>
                </div>

                <div className="rounded-full bg-multi-gradient h-[45px] w-[45px] flex justify-center items-center">
                  <div className="rounded-full bg-[#fad1e6] h-[40px] w-[40px] flex justify-center items-center">
                    <Youtube />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeModal;
