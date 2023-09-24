import { FunctionComponent, useCallback } from 'react'
// material-ui
import MainCard from 'components/cards/MainCard'
import { Typography } from '@mui/material'
import styled from 'styled-components'
import BackendError from 'exceptions/backend-error'
import createWallet from 'services/wallets/create-wallet'
import { useNavigate } from 'react-router'
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage
} from 'store/customizationSlice'
import { useAppDispatch } from '../../store/index'
import Form, { FormValues } from './form'
import { FormikHelpers } from 'formik'

const CreateAdmin: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
        await createWallet(values)
        navigate('/general/wallets')
        dispatch(
          setSuccessMessage(
            `Billetera ${values.description} creada correctamente`
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
        dispatch(setIsLoading(false))
        setSubmitting(false)
      }
    },
    [dispatch, navigate]
  )

  return (
    <div className={className}>
      <MainCard>
        <Typography variant='h3' component='h3'>
          Billeteras
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          description: '',
          submit: null
        }}
        title={'Crear Billetera'}
        onSubmit={onSubmit}
      />
    </div>
  )
}

interface Props {
  className?: string
}

export default styled(CreateAdmin)`
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
