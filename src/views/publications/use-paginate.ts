// material-ui

import { useEffect, useState, useCallback } from 'react';
import getPaginate from 'services/publications/get-paginate';
import { Publication } from 'services/publications/types';
import { PaginateData } from 'services/types';
import BackendError from 'exceptions/backend-error';
import { useAppDispatch } from 'store';
import { setErrorMessage, setIsLoading } from 'store/customizationSlice';

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Publication[]>([]);
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState<PaginateData>({
    total: 0,
    page: 1,
    perPage: 5,
    pages: 0,
  });

  const fetchPublications = useCallback(async (page?: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginate({
        page: page || 1,
        size: paginate.perPage,
      });
      setItems(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch, paginate.perPage]);

  useEffect(() => {
    fetchPublications(page);
  }, [fetchPublications, page]);

  return { items, page, paginate, setPage, fetchPublications } as const;
}