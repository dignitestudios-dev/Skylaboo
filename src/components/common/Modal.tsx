"use client";
import React, { useEffect, useState } from "react";

const Modal = ({
  children,
  showModal,
  onHide,
}: {
  children: React.ReactNode;
  showModal?: "show" | "hide";
  onHide?: any;
}) => {
  if (showModal && showModal === "hide") return null;

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
      onHide?.();
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
        className={`flex justify-center lg:items-center fixed top-0  ${
          show ? "opacity-100" : "opacity-0"
        } ${
          showDelay ? "block" : "hidden"
        } left-0 z-50 w-full h-screen transition-all duration-500 py-10 overflow-auto`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white sm:p-10 p-5 rounded-4xl h-fit w-[80%]"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
