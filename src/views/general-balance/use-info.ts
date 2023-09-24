import { useEffect, useState, useCallback } from 'react';
import getOverviewData from 'services/overview/get-overview-data';
import { OverviewDataResponse } from 'services/overview/types';
import BackendError from 'exceptions/backend-error';
import { useAppDispatch } from 'store';
import { setErrorMessage, setIsLoading } from 'store/customizationSlice';

export default function useOverviewInfo() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<OverviewDataResponse>();

  const getOverviewInfo = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getOverviewData();
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getOverviewInfo();
  }, [getOverviewInfo]);

  return { items, getOverviewInfo } as const;
}
