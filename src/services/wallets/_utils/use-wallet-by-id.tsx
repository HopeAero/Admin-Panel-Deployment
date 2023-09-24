import { useCallback, useEffect, useState } from 'react'
// material-ui
import BackendError from 'exceptions/backend-error'
import { setIsLoading, setErrorMessage } from 'store/customizationSlice'
import { useAppDispatch } from '../../../store/index'
import { Wallet } from 'services/wallets/types'
import getWallet from 'services/wallets/get-wallet'

export default function useWalletById(walletId: number | null) {
  const dispatch = useAppDispatch()
  const [wallet, setWallet] = useState<Wallet | null>(null)

  const fetchWallet = useCallback(
    async (walletId: number) => {
      try {
        dispatch(setIsLoading(true))
        const response = await getWallet(walletId)
        setWallet(response)
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
    if (walletId) fetchWallet(walletId)
  }, [fetchWallet, walletId])

  return wallet
}
