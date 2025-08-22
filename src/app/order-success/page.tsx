"use client";
import React, { useMemo } from "react";
import OrderSuccessScreen from "@/components/order/OrderSuccessScreen";

const isBrowser = typeof window !== "undefined";

const OrderSuccess = () => {
  const orderData = useMemo(() => {
    if (isBrowser) {
      const orderDetails = localStorage.getItem("orderData");
      if (orderDetails) {
        const orderDetailsParsed = JSON.parse(orderDetails);
        return orderDetailsParsed;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }, []);

  return <OrderSuccessScreen orderData={orderData} />;
};

export default OrderSuccess;
