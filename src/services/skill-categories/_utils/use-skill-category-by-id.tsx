import { useCallback, useEffect, useState } from 'react'
// material-ui
import BackendError from 'exceptions/backend-error'
import { setIsLoading, setErrorMessage } from 'store/customizationSlice'
import { useAppDispatch } from '../../../store/index'
import { SkillCategory } from 'services/skill-categories/types'
import getSkillCategory from '../get-skill-category'

export default function useSkillCategoryById(skillCategoryId: number | null) {
  const dispatch = useAppDispatch()
  const [skillCategory, setSkillCategory] = useState<SkillCategory | null>(null)

  const fetchSkillCategory = useCallback(
    async (skillCategoryId: number) => {
      try {
        dispatch(setIsLoading(true))
        const response = await getSkillCategory(skillCategoryId)
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
    if (skillCategoryId) fetchSkillCategory(skillCategoryId)
  }, [fetchSkillCategory, skillCategoryId])

  return skillCategory
}
