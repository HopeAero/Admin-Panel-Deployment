import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import { Wallet } from "../types";
import getAllWallets from "../get-all-wallets";

export default function useWalletOptions(): SelectOption[] {
  const [items, setItems] = useState<Wallet[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllWallets();
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map((item) => ({
    label: item.description + ' - SALDO $' + item.balance,
    value: item.walletId,
  }));
}
