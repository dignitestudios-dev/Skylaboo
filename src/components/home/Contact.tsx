import React from "react";
import SectionHeading from "../common/SectionHeading";
import Image from "next/image";
import Location from "../icons/Location";
import Message from "../icons/Message";
import Phone from "../icons/Phone";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section id="contact" className="bg-[#f5f5f5] sm:p-12 p-6">
      <div className="w-full flex flex-col gap-3 items-center justify-center">
        <SectionHeading title1="Contact" title2="Us" />{" "}
        <p className="text-center text-black/65 text-sm">
          Need assistance? We’re just a message away.{" "}
        </p>
      </div>

      <div className="relative overflow-hidden mt-5 bg-[#f6e6f5] w-full lg:px-20 sm:px-12 min-[520px]:px-6 px-3 sm:py-12 py-6 sm:rounded-[50px] min-[520px]:rounded-4xl rounded-3xl flex lg:flex-row flex-col justify-between items-center sm:gap-10 gap-5">
        <div className="space-y-5 relative z-20">
          <Image
            src={"/images/logo.webp"}
            alt="Skylaboo"
            width={100}
            height={100}
          />
          <p>
            Have questions or feedback? Get in touch with our <br /> friendly
            support team for assistance. We're here to help!
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <Location /> <p className="text-sm">Miami, FL</p>
            </li>
            <li className="flex items-center gap-3">
              <Message /> <p className="text-sm">info@skylaboo.com</p>
            </li>
            <li className="flex items-center gap-3">
              <Phone /> <p className="text-sm">786-956-1500</p>
            </li>
          </ul>
        </div>

        <div className="sm:px-0 px-3">
          <ContactForm />
        </div>

        <div className="absolute z-10 lg:-right-28 -right-12 lg:bottom-auto -bottom-[260px] lg:w-[600px] w-[110%] lg:h-[900px] h-[520px] rounded-[50%] bg-purple-gradient" />
      </div>
    </section>
  );
};

export default Contact;
