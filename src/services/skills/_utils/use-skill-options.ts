import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import { Skill } from "../types";
import getAllSkills from "../get-all-skills";

export default function useSkillOptions(skillId: number): SelectOption[] {
  const [items, setItems] = useState<Skill[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllSkills(skillId);
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, skillId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map((item) => ({
    label: item.name,
    value: item.skillId,
  }));
}
