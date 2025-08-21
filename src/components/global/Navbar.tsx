"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CartIcon from "../icons/CartIcon";
import Image from "next/image";
import { toggleShowCart } from "@/lib/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);
  const navLinks: { title: string; path: string }[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "New",
      path: "/#new",
    },
    {
      title: "Shop",
      path: "/shop",
    },
    {
      title: "About",
      path: "/#about",
    },
    {
      title: "Contact",
      path: "/#contact",
    },
  ];

  const handleSetHashValue = (linkPath: string, isHome: boolean) => {
    setTimeout(() => {
      const hashValue = window.location.hash; // Remove the '#'
      if (
        linkPath === "/shop" ||
        pathname === "/shop" ||
        linkPath === "/" ||
        (pathname === "/" && isHome && !hashValue)
      ) {
        setActiveLink("");
        return;
      }
      if (hashValue) setActiveLink(`/${hashValue}`);
    }, 30);
  };

  const handleShowCart = () => {
    dispatch(toggleShowCart(true));
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    const checkbox = document.getElementById("checkbox");
    if (checkbox) (checkbox as HTMLInputElement).checked = false;
  };

  useEffect(() => {
    if (pathname === "/shop") {
      setActiveLink("");
    } else {
      setTimeout(() => {
        const hashValue = window.location.hash; // Remove the '#'
        if (hashValue) {
          handleSetHashValue(`/${hashValue}`, true);
        } else {
          handleSetHashValue("/", true);
        }
      }, 30);
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full flex lg:justify-center justify-end items-center px-12">
      {/* Large Screen navbar */}
      <nav className="w-full rounded-full mt-10 backdrop-blur-lg lg:flex hidden items-center">
        <div className="relative h-[75px] flex-1 flex items-center">
          <Image
            src={"/images/navleft.png"}
            alt="Skylaboo"
            width={130}
            height={130}
            className="h-[75px] w-full absolute z-10"
          />
          <ul className="flex h-fit items-center relative z-20 min-[1100px]:space-x-6 space-x-3 min-[1150px]:ps-12 ps-6">
            {navLinks.map((link, index) => {
              const isActive =
                link.path.includes("#") && link.path == activeLink
                  ? true
                  : pathname === "/" && activeLink
                  ? false
                  : link.path === pathname ||
                    (link.path === "/shop" && pathname.includes("shop"));
              return (
                <li
                  key={index}
                  className={`uppercase font-extralight ${
                    isActive ? "gradient-text font-bold" : "text-black"
                  }`}
                  onClick={() =>
                    handleSetHashValue(link.path, link.path === "/")
                  }
                >
                  {link.path.includes("#") ? (
                    <a href={link.path}>{link.title}</a>
                  ) : (
                    <Link href={link.path}>{link.title}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Image
            src={"/images/nav-logo.png"}
            alt="Skylaboo"
            width={130}
            height={130}
            className="-mt-12"
          />
        </div>

        <div className="flex relative justify-end items-center h-[75px] flex-1">
          <Image
            src={"/images/navright.png"}
            alt="Skylaboo"
            width={130}
            height={130}
            className="h-[75px] w-full absolute z-10"
          />
          <button
            className="bg-[var(--color-yellow)] relative z-20 cursor-pointer w-fit px-4 py-1 rounded-full flex items-center gap-2 me-6"
            onClick={handleShowCart}
          >
            <CartIcon />{" "}
            <span className="text-white text-xs">{cart?.products?.length}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 right-0 p-2 z-50 w-full flex justify-between items-center">
        <Image
          src={"/images/logo.webp"}
          alt="Skylaboo"
          width={100}
          height={100}
          className="w-14 h-14"
        />

        <div className="flex items-center gap-2">
          <button
            className="bg-[var(--color-yellow)] relative z-20 cursor-pointer w-fit px-4 py-1 rounded-full flex items-center gap-2"
            onClick={handleShowCart}
          >
            <CartIcon />{" "}
            <span className="text-white text-xs">{cart?.products?.length}</span>
          </button>

          <div>
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => setIsOpen(e.target.checked)}
            />
            <label htmlFor="checkbox" className="toggle">
              <div className="bars" id="bar1" />
              <div className="bars" id="bar2" />
              <div className="bars" id="bar3" />
            </label>
          </div>
        </div>
      </div>

      <nav className="">
        <div
          className={`lg:hidden block p-12 fixed top-0 ${
            isOpen ? "left-0" : "-left-[100%]"
          } w-screen h-full z-40 bg-[var(--color-purple)]/20 backdrop-blur-lg flex justify-center items-center transition-all duration-300`}
        >
          <ul className="tracking-wider text-2xl flex flex-col items-center gap-5 text-black">
            {navLinks.map((link, index) => {
              const isActive =
                link.path.includes("#") && link.path == activeLink
                  ? true
                  : pathname === "/" && activeLink
                  ? false
                  : link.path === pathname ||
                    (link.path === "/shop" && pathname.includes("shop"));
              return (
                <li
                  key={index}
                  className={`uppercase font-bold  ${
                    isActive ? "gradient-text font-bold" : "text-black"
                  }`}
                  onClick={() => {
                    handleSetHashValue(link.path, link.path === "/");
                    handleLinkClick();
                  }}
                >
                  {link.path.includes("#") ? (
                    <a href={link.path}>{link.title}</a>
                  ) : (
                    <Link href={link.path}>{link.title}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
