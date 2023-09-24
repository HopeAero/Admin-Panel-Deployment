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
import editSwap from 'services/swaps/edit-swap'
import useSwapById from '../../../services/swaps/_utils/use-swap-by-id'
import useSwapId from '../../../services/swaps/_utils/use-swap-id'
import { FormikHelpers } from 'formik'

const EditSwap: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const swapId = useSwapId()
  const swap = useSwapById(swapId)

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
        await editSwap(swapId!, { ...values, amount: +values.amount })
        navigate('/general/swaps')
        dispatch(setSuccessMessage(`Cambio ${swapId} editado correctamente`))
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
    [dispatch, navigate, swapId]
  )

  return (
    <div className={className}>
      <MainCard>
        <Typography variant='h3' component='h3'>
          Cambio
        </Typography>
      </MainCard>
      {swap && (
        <Form
          initialValues={{
            amount: swap.amount,
            source: swap.source,
            destination: swap.destination,
            submit: null
          }}
          title={'Editar Cambio'}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}

interface Props {
  className?: string
}

export default styled(EditSwap)`
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
