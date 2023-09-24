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
import editSkill from 'services/skills/edit-skill'
import useSkillById from '../../../services/skills/_utils/use-skill-by-id'
import useSkillId from '../../../services/skills/_utils/use-skill-id'
import { FormikHelpers } from 'formik'

const EditSkill: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const skillId = useSkillId()
  const skill = useSkillById(skillId)

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
        await editSkill(skillId!, values)
        navigate('/general/skills')
        dispatch(
          setSuccessMessage(`Habilidad ${skillId} editada correctamente`)
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
    [dispatch, navigate, skillId]
  )

  return (
    <div className={className}>
      <MainCard>
        <Typography variant='h3' component='h3'>
          Habilidades
        </Typography>
      </MainCard>
      {skill && (
        <Form
          initialValues={{
            skillCategoryId: skill.skillCategoryId,
            name: skill.name,
            submit: null
          }}
          title={'Editar Habilidad'}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}

interface Props {
  className?: string
}

export default styled(EditSkill)`
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
