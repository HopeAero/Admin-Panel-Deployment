import { FunctionComponent } from 'react'
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
// material-ui
import MainCard from 'components/cards/MainCard'
import SelectField from 'components/SelectField'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import styled from 'styled-components'
import useWalletOptions from 'services/wallets/_utils/use-wallets-options'
import { useNavigate } from 'react-router'

const USE_AUTOCOMPLETE = false

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues
}) => {
  const walletOptions = useWalletOptions()
  const navigate = useNavigate()
  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          description: Yup.string()
            .max(30)
            .required(
              'Es necesario proveer una descripción para este movimiento'
            ),
          amount: Yup.number()
            .notOneOf([0], 'El monto no puede ser 0')
            .typeError('El precio es invalido')
            .required('El precio es requerido'),
          walletId: Yup.number().min(1, 'Debe seleccionar una Billetera')
        })}
        onSubmit={onSubmit as any}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <MainCard className={'form-data'} title={title}>
              <SelectField
                fullWidth={true}
                className='field-form'
                name='walletId'
                onChange={handleChange}
                onBlur={handleBlur}
                label='Billetera'
                options={walletOptions}
                helperText={touched.walletId ? errors.walletId : ''}
                error={touched.walletId && !!errors.walletId}
                isAutocomplete={USE_AUTOCOMPLETE}
                value={values.walletId}
              />
              <FormControl className='field-form' fullWidth>
                <TextField
                  id='description'
                  label='Descripción'
                  variant='outlined'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  helperText={touched.description ? errors.description : ''}
                  error={touched.description && !!errors.description}
                  name='description'
                />
              </FormControl>
              <FormControl className='field-form' fullWidth>
                <TextField
                  id='amount'
                  label='Monto'
                  variant='outlined'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  helperText={touched.amount ? errors.amount : ''}
                  error={touched.amount && !!errors.amount}
                  name='amount'
                />
              </FormControl>
            </MainCard>
            <MainCard className={'form-data flex-column'}>
              {errors.submit && (
                <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button
                variant='outlined'
                onClick={() => {
                  navigate('/general/movements')
                }}
                color='primary'
                className={'margin'}
              >
                Volver
              </Button>
              <Button variant='outlined' type='submit' color='secondary'>
                Guardar
              </Button>
            </MainCard>
          </form>
        )}
      </Formik>
    </div>
  )
}

interface Props {
  className?: string
  onSubmit: OnSubmit
  title: string
  initialValues: FormValues
}

export type FormValues = {
  description: string
  amount: number
  walletId: number
  submit: string | null
}

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>

export default styled(Form)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .margin {
    margin-right: 10px;
  }

  .field-form {
    margin: 6px 0px;
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
