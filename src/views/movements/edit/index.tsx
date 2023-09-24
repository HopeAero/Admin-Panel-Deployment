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
import editMovement from 'services/movements/edit-movement'
import useMovementById from '../../../services/movements/_utils/use-movement-by-id'
import useMovementId from '../../../services/movements/_utils/use-movement-id'
import { FormikHelpers } from 'formik'

const EditMovement: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const movementId = useMovementId()
  const movement = useMovementById(movementId)

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
        await editMovement(movementId!, { ...values, amount: +values.amount })
        navigate('/general/movements')
        dispatch(
          setSuccessMessage(
            `Movimiento ${values.description} editado correctamente`
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
    [dispatch, navigate, movementId]
  )

  return (
    <div className={className}>
      <MainCard>
        <Typography variant='h3' component='h3'>
          Movimientos Internos
        </Typography>
      </MainCard>
      {movement && (
        <Form
          initialValues={{
            description: movement.description,
            amount: movement.amount,
            walletId: movement.walletId,
            submit: null
          }}
          title={'Editar Movimiento'}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}

interface Props {
  className?: string
}

export default styled(EditMovement)`
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
