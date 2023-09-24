import { FunctionComponent, useCallback } from 'react'
// material-ui
import MainCard from 'components/cards/MainCard'
import { Typography } from '@mui/material'
import styled from 'styled-components'
import BackendError from 'exceptions/backend-error'
import { useNavigate } from 'react-router'
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage
} from 'store/customizationSlice'
import { useAppDispatch } from '../../../store/index'
import Form, { FormValues } from '../form'
import editSkillCategory from 'services/skill-categories/edit-skill-category'
import useSkillCategoryById from '../../../services/skill-categories/_utils/use-skill-category-by-id'
import useSkillCategoryId from '../../../services/skill-categories/_utils/use-skill-category-id'
import { FormikHelpers } from 'formik'

const EditSkillCategory: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const skillCategoryId = useSkillCategoryId()
  const skillCategory = useSkillCategoryById(skillCategoryId)

  const onSubmit = useCallback(
    async (
      values: any,
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true))
        setErrors({})
        setStatus({})
        setSubmitting(true)
        await editSkillCategory(skillCategoryId!, values)
        navigate('/general/skill-categories')
        dispatch(
          setSuccessMessage(
            `Categoria de Habilidad ${values.name} editada correctamente`
          )
        )
      } catch (error) {
        if (error instanceof BackendError) {
          setErrors({
            ...error.getFieldErrorsMessages(),
            submit: error.getMessage()
          })
          dispatch(setErrorMessage(error.getMessage()))
        }
        setStatus({ success: false })
      } finally {
        setSubmitting(false)
        dispatch(setIsLoading(false))
      }
    },
    [dispatch, navigate, skillCategoryId]
  )

  return (
    <div className={className}>
      <MainCard>
        <Typography variant='h3' component='h3'>
          Categorias de Habilidades
        </Typography>
      </MainCard>
      {skillCategory && (
        <Form
          initialValues={{
            name: skillCategory.name,
            submit: null
          }}
          title={'Editar Categoria de Habilidad'}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}

interface Props {
  className?: string
}

export default styled(EditSkillCategory)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`
