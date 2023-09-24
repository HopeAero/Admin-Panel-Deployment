import { useCallback, useEffect, useState } from 'react'
// material-ui
import BackendError from 'exceptions/backend-error'
import { setIsLoading, setErrorMessage } from 'store/customizationSlice'
import { useAppDispatch } from '../../../store/index'
import { User } from 'services/users/types'
import getUser from 'services/users/get-user'

export default function useUserById(userId: number | null) {
  const dispatch = useAppDispatch()
  const [swap, setSwap] = useState<User | null>(null)

  const fetchUser = useCallback(
    async (userId: number) => {
      try {
        dispatch(setIsLoading(true))
        const response = await getUser(userId)
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
    if (userId) fetchUser(userId)
  }, [fetchUser, userId])

  return swap
}
