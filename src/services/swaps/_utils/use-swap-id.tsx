import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function useSwapId() {
  const navigate = useNavigate()
  const params = useParams()

  const [swapId, setSwapId] = useState<number | null>(null)
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/general/swaps')
    }

    setSwapId(params.id as unknown as number)
  }, [navigate, params.id])

  return swapId
}
