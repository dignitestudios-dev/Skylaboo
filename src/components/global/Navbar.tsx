"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CartIcon from "../icons/CartIcon";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

  const navLinks: { title: string; path: string }[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "New",
      path: "#new",
    },
    {
      title: "Shop",
      path: "/shop",
    },
    {
      title: "About",
      path: "#about",
    },
    {
      title: "Contact",
      path: "#contact",
    },
  ];

  const handleSetHashValue = (linkPath: string, isHome: boolean) => {
    if (
      linkPath === "/shop" ||
      pathname === "/shop" ||
      linkPath === "/" ||
      (pathname === "/" && isHome)
    ) {
      setActiveLink("");
      return;
    }
    setTimeout(() => {
      const hashValue = window.location.hash; // Remove the '#'
      if (hashValue) setActiveLink(hashValue);
      console.log("hashValue: ", hashValue);
    }, 30);
  };

  useEffect(() => {
    if (pathname === "/shop") {
      setActiveLink("");
      return;
    }
  }, [pathname]);

  console.log("activeLink: ", activeLink);
  console.log("pathname: ", pathname);

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center items-center">
      <nav
        className="w-full rounded-full bg-contain bg-no-repeat h-[75px] max-w-[1340px] ps-12 pe-6 mt-10 backdrop-blur-lg grid grid-cols-3 items-center"
        style={{
          backgroundImage: `url("/images/navbar-bg.png")`,
        }}
      >
        <ul className="flex h-fit items-center space-x-6">
          {navLinks.map((link, index) => {
            const isActive =
              link.path.includes("#") && link.path == activeLink
                ? true
                : pathname === "/" && activeLink
                ? false
                : link.path === pathname;
            return (
              <li
                key={index}
                className={`uppercase font-extralight ${
                  isActive ? "gradient-text font-bold" : "text-black"
                }`}
                onClick={() => handleSetHashValue(link.path, link.path === "/")}
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

        <div className="-ms-4 flex flex-col justify-center items-center">
          <Image
            src={"/images/nav-logo.png"}
            alt="Skylaboo"
            width={130}
            height={130}
            className="-mt-12"
          />
        </div>

        <div className="flex justify-end">
          <div className="bg-[var(--color-yellow)] w-fit px-4 py-1 rounded-full flex items-center gap-2">
            <CartIcon /> <span className="text-white text-xs">{"03"}</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
