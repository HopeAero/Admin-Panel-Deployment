import { useCallback, useEffect, useState } from 'react'
// material-ui
import BackendError from 'exceptions/backend-error'
import { setIsLoading, setErrorMessage } from 'store/customizationSlice'
import { useAppDispatch } from '../../../store/index'
import { Swap } from 'services/swaps/types'
import getSwap from 'services/swaps/get-swap'

export default function useSwapById(swapId: number | null) {
  const dispatch = useAppDispatch()
  const [swap, setSwap] = useState<Swap | null>(null)

  const fetchSwap = useCallback(
    async (swapId: number) => {
      try {
        dispatch(setIsLoading(true))
        const response = await getSwap(swapId)
        setSwap(response)
      } catch (error) {
        if (error instanceof BackendError)
          dispatch(setErrorMessage(error.getMessage()))
      } finally {
        dispatch(setIsLoading(false))
      }
    },
    [dispatch]
  )

  useEffect(() => {
    if (swapId) fetchSwap(swapId)
  }, [fetchSwap, swapId])

  return swap
}
