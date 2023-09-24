import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import { SkillCategory } from "../types";
import getAllSkillCategories from "../get-all-skill-categories";

export default function useSkillCategoryOptions(): SelectOption[] {
  const [items, setItems] = useState<SkillCategory[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllSkillCategories();
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
    label: item.name,
    value: item.skillCategoryId,
  }));
}
