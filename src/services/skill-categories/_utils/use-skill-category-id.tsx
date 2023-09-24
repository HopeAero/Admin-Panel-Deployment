import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function useSkillCategoryId() {
  const navigate = useNavigate()
  const params = useParams()

  const [skillCategoryId, setSkillCategoryId] = useState<number | null>(null)
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate('/general/skill-categories')
    }

    setSkillCategoryId(params.id as unknown as number)
  }, [navigate, params.id])

  return skillCategoryId
}
