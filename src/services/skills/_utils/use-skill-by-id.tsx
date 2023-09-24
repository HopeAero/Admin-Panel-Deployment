import { useCallback, useEffect, useState } from 'react'
// material-ui
import BackendError from 'exceptions/backend-error'
import { setIsLoading, setErrorMessage } from 'store/customizationSlice'
import { useAppDispatch } from '../../../store/index'
import { Skill } from 'services/skills/types'
import getSkill from '../get-skill'

export default function useSkillById(skillId: number | null) {
  const dispatch = useAppDispatch()
  const [skill, setSkillCategory] = useState<Skill | null>(null)

  const fetchSkill = useCallback(
    async (skillId: number) => {
      try {
        dispatch(setIsLoading(true))
        const response = await getSkill(skillId)
        setSkillCategory(response)
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
    if (skillId) fetchSkill(skillId)
  }, [fetchSkill, skillId])

  return skill
}
