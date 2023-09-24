import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function useMovementId() {
  const navigate = useNavigate()
  const params = useParams()

  const [movementId, setMovementId] = useState<number | null>(null)
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/general/movements')
    }

    setMovementId(params.id as unknown as number)
  }, [navigate, params.id])

  return movementId
}
