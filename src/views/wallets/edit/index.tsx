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
import editWallet from 'services/wallets/edit-wallet'
import useWalletById from '../../../services/wallets/_utils/use-wallet-by-id'
import useWalletId from '../../../services/wallets/_utils/use-wallet-id'
import { FormikHelpers } from 'formik'

const EditWallet: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const walletId = useWalletId()
  const wallet = useWalletById(walletId)

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
        await editWallet(walletId!, values)
        navigate('/general/wallets')
        dispatch(
          setSuccessMessage(
            `Billetera ${values.description} editada correctamente`
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
    [dispatch, navigate, walletId]
  )

  return (
    <div className={className}>
      <MainCard>
        <Typography variant='h3' component='h3'>
          Billeteras
        </Typography>
      </MainCard>
      {wallet && (
        <Form
          initialValues={{
            description: wallet.description,
            submit: null
          }}
          title={'Editar Billetera'}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}

interface Props {
  className?: string
}

export default styled(EditWallet)`
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
