import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function useUserId() {
  const navigate = useNavigate()
  const params = useParams()

  const [userId, setUserId] = useState<number | null>(null)
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/general/users')
    }

    setUserId(params.id as unknown as number)
  }, [navigate, params.id])

  return userId
}
