"use client";
import React, { useState } from "react";
import Phone from "../icons/Phone";
import Insta from "../icons/Insta";
import Linkedin from "../icons/Linkedin";
import Tiktok from "../icons/Tiktok";
import X from "../icons/X";
import Youtube from "../icons/Youtube";
import Image from "next/image";
import Message from "../icons/Message";
import Link from "next/link";
import Modal from "../common/Modal";

const Footer = () => {
  const [toggleTermsModal, setToggleTermsModal] = useState<"hide" | "show">(
    "hide"
  );
  const [togglePrivacyModal, setTogglePrivacyModal] = useState<"hide" | "show">(
    "hide"
  );

  return (
    <>
      <footer className="bg-[#f5f5f5]">
        <div className="sm:p-12 p-6 pb-6 rounded-t-2xl bg-white">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10 items-center sm:justify-around justify-center">
            <div className="lg:block hidden">
              <p className="uppercase text-[var(--color-purple)] font-bold text-sm mb-2">
                Contact us
              </p>
              <div className="flex items-center gap-2">
                <Phone />
                <p>10 (87) 738-3940</p>
              </div>
            </div>
            <div className="flex justify-center items-center lg:col-span-1 sm:col-span-2">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={"/images/logo.webp"}
                  alt="Skylaboo"
                  width={100}
                  height={100}
                />{" "}
                <div className="flex items-center gap-2">
                  <Message />
                  <p>contact@skylaboo.com</p>
                </div>
              </div>
            </div>
            <div className="lg:hidden block">
              <p className="uppercase text-[var(--color-purple)] font-bold text-sm mb-2">
                Contact us
              </p>
              <div className="flex items-center gap-2">
                {/* <Phone /> */}
                <p>10 (87) 738-3940</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div>
                <p className="uppercase text-[var(--color-purple)] font-bold text-sm mb-2">
                  Follow Us
                </p>
                <div>
                  <div className="flex items-center sm:gap-5 gap-3">
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

          <div className="my-10">
            <ul className="text-black/50 w-full flex items-center justify-center sm:gap-5 gap-3 sm:flex-nowrap flex-wrap sm:text-base text-sm">
              <li>
                <a href="/#about">About us</a>
              </li>
              <li>
                <a href="/#contact">Contact</a>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <a href="/#new">New</a>
              </li>
              <li>
                <button
                  className="cursor-pointer"
                  onClick={() => setToggleTermsModal("show")}
                >
                  Terms & Condition
                </button>
              </li>
              <li>
                <button
                  className="cursor-pointer"
                  onClick={() => setTogglePrivacyModal("show")}
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="w-full rounded-full bg-purple-gradient text-white py-3 sm:text-base text-sm">
            <p className="text-center">
              Copyright {new Date().getFullYear()} All rights reserved
            </p>{" "}
          </div>
        </div>
      </footer>

      {/* Terms and Conditions */}
      <Modal
        showModal={toggleTermsModal}
        onHide={() => setToggleTermsModal("hide")}
      >
        <div>
          <p className="text-center text-2xl text-[var(--color-purple)] font-bold mb-2">
            Terms & Conditions
          </p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            mollitia ipsum assumenda. Autem officiis reprehenderit corporis unde
            omnis enim deleniti ratione consequuntur, laboriosam commodi
            exercitationem quidem praesentium iste odit repellat reiciendis,
            harum ea? Cupiditate nesciunt optio nulla recusandae rem fugiat
            dolorum fuga reiciendis, consectetur officia expedita vitae quaerat
            minima hic dolores libero voluptatibus assumenda soluta beatae illum
            explicabo sapiente! Cumque nulla eveniet excepturi enim illum
            corrupti consequuntur provident recusandae et! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Exercitationem velit fugit
            expedita rerum tempora aliquid, odio minus dolore maxime iusto?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            necessitatibus odit aliquam qui quis mollitia assumenda ducimus
            nostrum, cupiditate in? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Alias sint iure modi nihil assumenda voluptate
            quam quo accusantium amet! Aliquam.
          </p>

          <br />

          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            mollitia ipsum assumenda. Autem officiis reprehenderit corporis unde
            omnis enim deleniti ratione consequuntur, laboriosam commodi
            exercitationem quidem praesentium iste odit repellat reiciendis,
            harum ea? Cupiditate nesciunt optio nulla recusandae rem fugiat
            dolorum fuga reiciendis, consectetur officia expedita vitae quaerat
            minima hic dolores libero voluptatibus assumenda soluta beatae illum
            explicabo sapiente! Cumque nulla eveniet excepturi enim illum
            corrupti consequuntur provident recusandae et! Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Rerum corporis voluptate
            itaque perspiciatis repellat temporibus harum fugiat suscipit
            aspernatur iusto.
          </p>
        </div>
      </Modal>

      {/* Privacy Policy */}
      <Modal
        showModal={togglePrivacyModal}
        onHide={() => setTogglePrivacyModal("hide")}
      >
        <div>
          <p className="text-center text-2xl text-[var(--color-purple)] font-bold mb-2">
            Privacy Policy
          </p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            mollitia ipsum assumenda. Autem officiis reprehenderit corporis unde
            omnis enim deleniti ratione consequuntur, laboriosam commodi
            exercitationem quidem praesentium iste odit repellat reiciendis,
            harum ea? Cupiditate nesciunt optio nulla recusandae rem fugiat
            dolorum fuga reiciendis, consectetur officia expedita vitae quaerat
            minima hic dolores libero voluptatibus assumenda soluta beatae illum
            explicabo sapiente! Cumque nulla eveniet excepturi enim illum
            corrupti consequuntur provident recusandae et! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Exercitationem velit fugit
            expedita rerum tempora aliquid, odio minus dolore maxime iusto?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            necessitatibus odit aliquam qui quis mollitia assumenda ducimus
            nostrum, cupiditate in? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Alias sint iure modi nihil assumenda voluptate
            quam quo accusantium amet! Aliquam.
          </p>

          <br />

          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
            mollitia ipsum assumenda. Autem officiis reprehenderit corporis unde
            omnis enim deleniti ratione consequuntur, laboriosam commodi
            exercitationem quidem praesentium iste odit repellat reiciendis,
            harum ea? Cupiditate nesciunt optio nulla recusandae rem fugiat
            dolorum fuga reiciendis, consectetur officia expedita vitae quaerat
            minima hic dolores libero voluptatibus assumenda soluta beatae illum
            explicabo sapiente! Cumque nulla eveniet excepturi enim illum
            corrupti consequuntur provident recusandae et! Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Rerum corporis voluptate
            itaque perspiciatis repellat temporibus harum fugiat suscipit
            aspernatur iusto.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
