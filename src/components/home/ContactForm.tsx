"use client";
import React, { useState } from "react";
import User from "../icons/User";
import Message from "../icons/Message";
import Edit from "../icons/Edit";
import { contactFormHooks } from "@/hooks/contact-form/ContactFormHooks";
import { Loader2 } from "lucide-react";
import FromSubmissionSuccessModal from "./FromSubmissionSuccessModal";

const ContactForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const { loading, formData, setFormData, submitContactForm } =
    contactFormHooks.useSubmitContactForm();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    // Only letters and spaces for name
    const alphaFields = ["name"];
    if (alphaFields.includes(name)) {
      newValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    if (name === "name" || name === "email") {
      // Disallow any leading whitespace and prevent two or more consecutive spaces in any field
      newValue = newValue.replace(/^\s+/, "");
      newValue = newValue.replace(/ {2,}/g, " ");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await submitContactForm();

    if (success) setShow(true);

    console.log("contact success: ", success);
  };

  return (
    <>
      <div className="relative z-20 h-full bg-[#fedffb] min-[425px]:p-5 min-[425px]:py-5 p-3 py-5 rounded-4xl rounded-tl-xl shadow-[0px_5px_35px_0px_#725F0026] border-l-4 border-[var(--color-yellow)] w-full">
        <form className="space-y-5" onSubmit={handleSubmitContactForm}>
          <div className="bg-multi-gradient p-0.5 rounded-full sm:w-[415px] min-[425px]:w-[320px] min-[375px]:w-[240px] w-[220px] max-w-full h-[48px]">
            <div className="rounded-full bg-[#fedffb] w-full h-full flex items-center gap-2 px-3">
              <User />
              <input
                type="text"
                className="outline-none border-none flex-1"
                name="name"
                id="name"
                disabled={loading}
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="bg-multi-gradient p-0.5 rounded-full sm:w-[415px] min-[425px]:w-[320px] min-[375px]:w-[240px] w-[220px] max-w-full h-[48px]">
            <div className="rounded-full bg-[#fedffb] w-full h-full flex items-center gap-2 px-3">
              <Message />
              <input
                type="email"
                className="outline-none border-none flex-1"
                name="email"
                id="email"
                disabled={loading}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="bg-multi-gradient p-0.5 overflow-hidden rounded-3xl sm:w-[415px] min-[425px]:w-[320px] min-[375px]:w-[240px] w-[220px] max-w-full">
            <div className="rounded-3xl bg-[#fedffb] w-full h-full flex items-start gap-2 px-3 py-4">
              <Edit />
              <textarea
                className="outline-none border-none flex-1 h-[100px] min-h-[100px] max-h-[100px]"
                name="message"
                id="message"
                disabled={loading}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer uppercase bg-[var(--color-purple)] disabled:bg-[var(--color-purple)]/50 text-white px-4 py-2 w-full rounded-3xl rounded-tl-2xl"
          >
            {loading ? (
              <span className="text-gray-100">
                <Loader2 className="animate-spin inline" /> Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>

      <FromSubmissionSuccessModal showSuccess={show} setSuccessShow={setShow} />
    </>
  );
};

export default ContactForm;
