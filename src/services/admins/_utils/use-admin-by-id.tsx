import { useCallback, useEffect, useState } from 'react'
// material-ui
import BackendError from 'exceptions/backend-error'
import { setIsLoading, setErrorMessage } from 'store/customizationSlice'
import { useAppDispatch } from '../../../store/index'
import { Admin } from 'services/admins/types'
import getAdmin from 'services/admins/get-admin'

export default function useAdminById(adminId: number | null) {
  const dispatch = useAppDispatch()
  const [admin, setAdmin] = useState<Admin | null>(null)

  const fetchAdmin = useCallback(
    async (adminId: number) => {
      try {
        dispatch(setIsLoading(true))
        const response = await getAdmin(adminId)
        setAdmin(response)
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
    if (adminId) fetchAdmin(adminId)
  }, [fetchAdmin, adminId])

  return admin
}
