import { useCallback, useEffect, useState } from "react";
import { OrderDetailFormValues } from "../form/form";
import { LocalOrderDetail } from "../types";
import convertLocalToOrderActivitysInput from "../form/utils/convert-local-to-recommended-services-input";
import { OrderDetailPayload } from "../types";

const useInput =
  (
    orderId: number,
    inputOrderActivities: LocalOrderDetail[],
    onChange: (services: OrderDetailPayload[]) => void
  ) => {
  const [items, setItems] = useState<LocalOrderDetail[]>(inputOrderActivities);

  useEffect(() => {
    setItems(inputOrderActivities);
  }, [inputOrderActivities]);

  useEffect(() => {
    const _orderActivities = convertLocalToOrderActivitysInput(orderId, items);
    onChange(_orderActivities);
  }, [items, onChange, orderId]);

  const onDelete = useCallback((_: LocalOrderDetail, index: number) => {
    setItems((prev) => {
      const newServices = [...prev];
      newServices.splice(index, 1);
      return newServices;
    });
  }, []);

  const onUpdate = useCallback((orderActivity: LocalOrderDetail, formValues: OrderDetailFormValues, index: number) => {
    setItems((prev) => {
        const newServices = [...prev];
        newServices[index] = {
          ...orderActivity,
          ...{ ...formValues as unknown as LocalOrderDetail },
        };
        return newServices;
    });
  }, []);

  const onCreate = useCallback((formValues: OrderDetailFormValues) => {
    setItems((prev) => {
      const newServices = [...prev] as LocalOrderDetail[];
      newServices.push(formValues as unknown as LocalOrderDetail);
      return newServices;
    });
  }, []);

  return { items, onDelete, onUpdate, onCreate };
};

export default useInput;
