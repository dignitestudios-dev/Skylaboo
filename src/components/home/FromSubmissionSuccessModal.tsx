"use client";
import React, { useEffect, useState } from "react";
import PlayButton from "../icons/PlayButton";
import Image from "next/image";
import Link from "next/link";

const FromSubmissionSuccessModal: React.FC<{
  showSuccess: boolean;
  setSuccessShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showSuccess, setSuccessShow }) => {
  const [show, setShow] = useState(false);
  const [showDelay, setShowDelay] = useState(false);

  const handleShow = () => {
    setShowDelay(true);
    setTimeout(() => {
      setShow(true);
      localStorage.setItem("welcome", "done");
    }, 300);
  };

  const handleHide = () => {
    setShow(false);
    setTimeout(() => {
      setShowDelay(false);
      setSuccessShow(false);
    }, 300);
  };

  useEffect(() => {
    if (showSuccess) {
      handleShow();
    } else {
      handleHide();
    }
  }, [showSuccess]);

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
              Thank you for reaching out! We’ve received your message and our
              team will get back to you very soon. We’re excited to have you
              with us!
            </p>

            <Link href={"#"} className="w-full">
              <button
                onClick={() => setShow(false)}
                className="cursor-pointer w-full py-3 bg-multi-gradient text-white rounded-full"
              >
                Back To Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FromSubmissionSuccessModal;
