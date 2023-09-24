import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function useClientId() {
  const navigate = useNavigate()
  const params = useParams()

  const [clientId, setClientId] = useState<number | null>(null)
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/clientela/clients')
    }

    setClientId(params.id as unknown as number)
  }, [navigate, params.id])

  return clientId
}
