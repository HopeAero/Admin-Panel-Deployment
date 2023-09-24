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
          amount: Yup.number()
            .notOneOf([0], 'El monto no puede ser 0')
            .min(0, 'No puede colocar números negativos')
            .typeError('El precio es invalido')
            .required('El precio es requerido'),
          source: Yup.number()
            .min(1, 'Debe seleccionar una Billetera de Origen')
            .notOneOf(
              [Yup.ref('destination'), null],
              'El origen no puede ser igual al destino'
            ),
          destination: Yup.number()
            .min(1, 'Debe seleccionar una Billetera de Destino')
            .notOneOf(
              [Yup.ref('source'), null],
              'El destino no puede ser igual al origen'
            )
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
                name='source'
                onChange={handleChange}
                onBlur={handleBlur}
                label='Origen'
                options={walletOptions}
                helperText={touched.source ? errors.source : ''}
                error={touched.source && !!errors.source}
                isAutocomplete={USE_AUTOCOMPLETE}
                value={values.source}
              />
              <SelectField
                fullWidth={true}
                className='field-form'
                name='destination'
                onChange={handleChange}
                onBlur={handleBlur}
                label='Destino'
                options={walletOptions}
                helperText={touched.destination ? errors.destination : ''}
                error={touched.destination && !!errors.destination}
                isAutocomplete={USE_AUTOCOMPLETE}
                value={values.destination}
              />
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
                  navigate('/general/swaps')
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
  amount: number
  source: number
  destination: number
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

  .field-form {
    margin: 6px 0px;
  }

  .margin {
    margin-right: 10px;
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
