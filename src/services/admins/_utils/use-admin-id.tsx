import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function useAdminId() {
  const navigate = useNavigate()
  const params = useParams()

  const [adminId, setAdminId] = useState<number | null>(null)
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/business/admins')
    }

    setAdminId(params.id as unknown as number)
  }, [navigate, params.id])

  return adminId
}
