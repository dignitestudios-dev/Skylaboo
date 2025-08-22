import { updateShippingCostAndPickupAddress } from "@/lib/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { api } from "@/lib/services";
import { AppConfigs } from "@/lib/types";
import { useEffect, useState } from "react";

const useGetAppConfigs = () => {
  const dispatch = useAppDispatch();
  const shippingCost = useAppSelector((state) => state.cart.cart.shippingCost);
  const [loading, setLoading] = useState<boolean>(false);
  const [appConfigs, setAppConfigs] = useState<AppConfigs | null>();

  const getAppConfigs = async () => {
    setLoading(true);
    try {
      const response = await api.getAppConfigs();
      setAppConfigs(response.data);
      const payload = {
        shippingCost: response.data.shippingCost,
        pickupAddress: response.data.pickupAddress,
      };
      dispatch(updateShippingCostAndPickupAddress(payload));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getAppConfigs();
  }, []);

  return {
    loading,
    appConfigs,
  };
};

export const appConfigsHooks = {
  useGetAppConfigs,
};
