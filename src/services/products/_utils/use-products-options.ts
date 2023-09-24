import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import { Product } from "services/products/types";
import getAllProducts, { Body } from "services/products/get-all-products";

export default function useProductsOptions({ onlyOnStock }: Body): SelectOption[] {
  const [items, setItems] = useState<Product[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllProducts({ onlyOnStock });
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch, onlyOnStock]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map(item => ({
    label: item.productId + ' - ' + item.name + ' - STOCK: ' + item.quantity + ' - PRECIO: ' + item.price,
    value: item.productId,
  }));
}
