import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function useWalletId() {
  const navigate = useNavigate()
  const params = useParams()

  const [walletId, setWalletId] = useState<number | null>(null)
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/general/wallets')
    }

    setWalletId(params.id as unknown as number)
  }, [navigate, params.id])

  return walletId
}
