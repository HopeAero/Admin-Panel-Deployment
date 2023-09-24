import { useCallback, useEffect, useState } from 'react'
// material-ui
import BackendError from 'exceptions/backend-error'
import { setIsLoading, setErrorMessage } from 'store/customizationSlice'
import { useAppDispatch } from '../../../store/index'
import { Movement } from 'services/movements/types'
import getMovement from 'services/movements/get-movement'

export default function useMovementById(movementId: number | null) {
  const dispatch = useAppDispatch()
  const [movement, setMovement] = useState<Movement | null>(null)

  const fetchMovement = useCallback(
    async (movementId: number) => {
      try {
        dispatch(setIsLoading(true))
        const response = await getMovement(movementId)
        setMovement(response)
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
    if (movementId) fetchMovement(movementId)
  }, [fetchMovement, movementId])

  return movement
}
