"use client";
import React, { useMemo } from "react";
import OrderSuccessScreen from "@/components/order/OrderSuccessScreen";

const OrderSuccess = () => {
  const orderData = useMemo(() => {
    const orderDetails = localStorage.getItem("orderData");
    if (orderDetails) {
      const orderDetailsParsed = JSON.parse(orderDetails);
      return orderDetailsParsed;
    } else {
      return null;
    }
  }, []);

  return <OrderSuccessScreen orderData={orderData} />;
};

export default OrderSuccess;
