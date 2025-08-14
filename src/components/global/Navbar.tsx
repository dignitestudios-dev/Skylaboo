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
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

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
    <header className="sticky top-0 z-50 w-full flex justify-center items-center px-12">
      <nav className="w-full rounded-full mt-10 backdrop-blur-lg flex items-center">
        <div className="relative h-[75px] flex-1 flex items-center">
          <Image
            src={"/images/navleft.png"}
            alt="Skylaboo"
            width={130}
            height={130}
            className="h-[75px] w-full absolute z-10"
          />
          <ul className="flex h-fit items-center relative z-20 space-x-6 ps-12">
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
            <span className="text-white text-xs">{cartItems.length}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
