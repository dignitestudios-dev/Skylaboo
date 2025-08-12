"use client";
import React, { useState } from "react";
import User from "../icons/User";
import Message from "../icons/Message";
import Edit from "../icons/Edit";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative z-20 h-full bg-[#fedffb] p-5 rounded-4xl rounded-tl-xl shadow-[0px_5px_35px_0px_#725F0026] border-l-4 border-[var(--color-yellow)]">
      <form className="space-y-5">
        <div className="bg-multi-gradient p-0.5 rounded-full w-[415px] h-[48px]">
          <div className="rounded-full bg-[#fedffb] w-full h-full flex items-center gap-2 px-3">
            <User />
            <input
              type="text"
              className="outline-none border-none flex-1"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
          </div>
        </div>

        <div className="bg-multi-gradient p-0.5 rounded-full w-[415px] h-[48px]">
          <div className="rounded-full bg-[#fedffb] w-full h-full flex items-center gap-2 px-3">
            <Message />
            <input
              type="text"
              className="outline-none border-none flex-1"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>
        </div>

        <div className="bg-multi-gradient p-0.5 overflow-hidden rounded-3xl w-[415px]">
          <div className="rounded-3xl bg-[#fedffb] w-full h-full flex items-start gap-2 px-3 py-4">
            <Edit />
            <textarea
              className="outline-none border-none flex-1 h-[100px] min-h-[100px] max-h-[100px]"
              name="message"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
