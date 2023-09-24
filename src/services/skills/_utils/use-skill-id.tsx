import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function useSkillId() {
  const navigate = useNavigate()
  const params = useParams()

  const [skillId, setSkillId] = useState<number | null>(null)
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/general/skills')
    }

    setSkillId(params.id as unknown as number)
  }, [navigate, params.id])

  return skillId
}
