"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import toast from "react-hot-toast";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { api } from "@/lib/services";
import { OrderData } from "@/lib/types";
import { utils } from "@/lib/utils";

const PaymentForm = ({
  subtotal,
  shipping,
  onPaymentSuccess,
  onPaymentError,
}: {
  subtotal: number;
  shipping: number;
  onPaymentSuccess: (paymentIntent: any) => void;
  onPaymentError: (error: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const { cart } = useAppSelector((state) => state.cart);

  const elementOptions = {
    style: {
      base: {
        color: "#424770",
        fontSize: "16px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "12px",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handleCardChange = (elementType: string) => (event: any) => {
    setCardComplete((prev) => ({
      ...prev,
      [elementType]: event.complete,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart.products.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!stripe || !elements) {
      onPaymentError("Stripe not loaded");
      return;
    }

    // Check if all card fields are complete
    if (
      !cardComplete.cardNumber ||
      !cardComplete.cardExpiry ||
      !cardComplete.cardCvc
    ) {
      onPaymentError("Please complete all card details");
      return;
    }

    setLoading(true);
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      onPaymentError("Card number element not found");
      setLoading(false);
      return;
    }

    try {
      // Create payment method
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: {
            name: `${cart?.delivery?.firstName || cart?.contact?.email} ${
              cart?.delivery?.lastName || ""
            }`,
            email: cart?.contact?.email,
            address:
              cart?.orderType === "delivery"
                ? {
                    line1: cart?.delivery?.address,
                    city: cart?.delivery?.city,
                    postal_code: cart?.delivery?.postalCode,
                  }
                : undefined,
          },
        });

      if (pmError || !paymentMethod) {
        onPaymentError(pmError?.message || "Payment method creation failed");
        setLoading(false);
        return;
      }

      const formattedProducts = cart?.products.map((product) => {
        return {
          product: product.product._id,
          quantity: product.quantity,
          selectedColor: product.selectedColor,
          selectedSize: product.selectedSize,
        };
      });

      const orderData = {
        products: formattedProducts,
        contact: cart?.contact,
        orderType: cart?.orderType,
        shippingCost: shipping,
        paymentMethodId: paymentMethod.id,
        orderDate: utils.formatDateWithMonthName(new Date()),
        ...(cart?.orderType === "delivery"
          ? { delivery: cart.delivery }
          : { pickupAddress: cart.pickupAddress }),
      };

      // Create payment intent on your backend
      const paymentData = await api.createOrder(orderData);

      console.log("payment data: ", paymentData);

      const formattedOrderData: OrderData = {
        ...paymentData.data,
        products: cart.products,
      };

      // Handle SCA/3D Secure if needed
      if (paymentData?.data?.clientSecret) {
        const result = await stripe.confirmCardPayment(
          paymentData.data?.clientSecret
        );

        if (result.error) {
          onPaymentError(
            result.error.message || "Payment authentication failed"
          );
        } else if (result.paymentIntent.status === "succeeded") {
          onPaymentSuccess(formattedOrderData);
        } else {
          onPaymentError(`Payment status: ${result.paymentIntent.status}`);
        }
      } else if (paymentData?.data?.paymentIntentId) {
        onPaymentSuccess(formattedOrderData);
      } else {
        onPaymentError("Your order placed");
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Payment processing failed";
      onPaymentError(errorMessage);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Number */}
      <div className="space-y-2">
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Card Number
        </label>
        <div className="p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
          <CardNumberElement
            id="cardNumber"
            options={elementOptions}
            onChange={handleCardChange("cardNumber")}
          />
        </div>
      </div>

      {/* Card Expiry and CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="cardExpiry"
            className="block text-sm font-medium text-gray-700"
          >
            Expiry Date
          </label>
          <div className="p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
            <CardExpiryElement
              id="cardExpiry"
              options={elementOptions}
              onChange={handleCardChange("cardExpiry")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="cardCvc"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <div className="p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
            <CardCvcElement
              id="cardCvc"
              options={elementOptions}
              onChange={handleCardChange("cardCvc")}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={
          !stripe ||
          loading ||
          !cardComplete.cardNumber ||
          !cardComplete.cardExpiry ||
          !cardComplete.cardCvc
        }
        className="w-full flex justify-center items-center py-3 text-white bg-[var(--color-purple)] rounded-3xl rounded-tl-2xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing Payment...
          </div>
        ) : (
          `Pay $${(subtotal + shipping).toFixed(2)}`
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
