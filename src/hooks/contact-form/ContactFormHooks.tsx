import { api } from "@/lib/services";
import { ContactForm } from "@/lib/types";
import { useState } from "react";
import toast from "react-hot-toast";

const useSubmitContactForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const submitContactForm = async () => {
    if (
      !formData?.name?.trim() ||
      !formData?.email?.trim() ||
      !formData?.message?.trim()
    ) {
      toast.error("Your name, email and message are required");
      return false;
    }

    setLoading(true);
    try {
      const data = await api.submitContactForm(formData);

      console.log("contact form response: ", data);

      console.log("data.success: ", data.success);

      setLoading(false);
      return data.success;
    } catch (error: any) {
      toast.error(
        error?.message ||
          error?.response?.data?.message ||
          "Something went wrong"
      );
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    formData,
    setFormData,
    submitContactForm,
  };
};

export const contactFormHooks = {
  useSubmitContactForm,
};
