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
import { useAppDispatch } from 'store'
import Form from './form'
import createOrder from 'services/orders/create-order'

const INITIAL_VALUES: any = {
  clientId: 0,
  walletId: 0,
  adminId: 0,
  products: [],
  submit: null
}

const CreateService: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit = useCallback(
    async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
      console.log(values)
      try {
        dispatch(setIsLoading(true))
        setErrors({})
        setStatus({})
        setSubmitting(true)
        await createOrder({
          clientId: values.clientId,
          walletId: values.walletId,
          adminId: values.adminId,
          products: values.products
        })
        navigate('/clientela/orders')
        dispatch(
          setSuccessMessage(`Orden ${values.description} creada correctamente`)
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
          Ordenes
        </Typography>
      </MainCard>

      <Form
        initialValues={INITIAL_VALUES}
        title={'Crear Orden'}
        onSubmit={onSubmit}
      />
    </div>
  )
}

interface Props {
  className?: string
}

export default styled(CreateService)`
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
