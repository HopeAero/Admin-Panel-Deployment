import { FunctionComponent, useCallback } from 'react'
// material-ui
import styled from 'styled-components'
import MainCard from 'components/cards/MainCard'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import BackendError from 'exceptions/backend-error'
import createProduct from 'services/products/create-product'
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage
} from 'store/customizationSlice'
import { useAppDispatch } from '../../store/index'
import Form, { FormValues } from './form'
import { FormikHelpers } from 'formik'

const CreateProduct: FunctionComponent<Props> = ({ className }) => {
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
        await createProduct({ ...values, price: +values.price })
        navigate('/business/products')
        dispatch(
          setSuccessMessage(
            `Producto ${values.shortNameProduct} creado correctamente`
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
          Productos
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          name: '',
          price: 0,
          submit: null
        }}
        isCreate
        title={'Crear producto'}
        onSubmit={onSubmit}
      />
    </div>
  )
}

interface Props {
  className?: string
}

export default styled(CreateProduct)`
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
