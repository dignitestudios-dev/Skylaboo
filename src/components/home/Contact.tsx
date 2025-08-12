import React from "react";
import SectionHeading from "../common/SectionHeading";
import Image from "next/image";
import Location from "../icons/Location";
import Message from "../icons/Message";
import Phone from "../icons/Phone";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section id="contact" className="bg-[#f5f5f5] p-12">
      <div className="w-full flex flex-col gap-3 items-center justify-center">
        <SectionHeading title1="Contact" title2="Us" />{" "}
        <p className="text-center text-black/65 text-sm">
          Need assistance? We’re just a message away.{" "}
        </p>
      </div>

      <div className="relative overflow-hidden mt-5 bg-[#f6e6f5] w-full px-20 py-12 rounded-[50px] flex justify-between items-center">
        <div className="space-y-5">
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

        <div>
          <ContactForm />
        </div>

        <div className="absolute -right-28 w-[600px] h-[900px] rounded-[50%] bg-purple-gradient" />
      </div>
    </section>
  );
};

export default Contact;
