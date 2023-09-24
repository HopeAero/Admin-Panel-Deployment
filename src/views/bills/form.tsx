import { Formik, FormikHelpers } from 'formik'
import { FunctionComponent, useState } from 'react'
// material-ui
import styled from 'styled-components'
import MainCard from 'components/cards/MainCard'
import SelectField from 'components/SelectField'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import useOrderOptions from 'services/orders/_utils/use-orders-options'
import * as Yup from 'yup'
import useOrderById from 'services/orders/_utils/use-order-by-id'
import InvoiceTable from 'components/InvoiceTable'
import { useNavigate } from 'react-router'

const USE_AUTOCOMPLETE = false

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  onEdit
}) => {
  const [orderId, setOrderId] = useState<number | null>(null)
  const [discountAmount, setDiscountAmount] = useState<string>('')
  const ordersOptions = useOrderOptions({
    onlyWithoutBill: !onEdit,
    includeOrderId: null
  })

  let equis = orderId
  if (onEdit) {
    equis = initialValues.orderId
  }

  const order = useOrderById(equis)

  const navigate = useNavigate()

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        onSubmit={onSubmit as any}
        validationSchema={Yup.object().shape({
          orderId: Yup.number()
            .typeError('La orden es invalida')
            .required('La orden es requerida'),
          discountAmount: Yup.number().typeError(
            'El descuento debe ser un valor númerico'
          )
        })}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className='container-form-bills'>
              <MainCard className={'form-data'} title={title}>
                <SelectField
                  fullWidth={true}
                  className='field-form'
                  name='orderId'
                  disabled={onEdit}
                  onChange={(e) => {
                    handleChange(e)
                    setOrderId(e.target.value as number)
                  }}
                  onBlur={handleBlur}
                  label='Orden'
                  options={ordersOptions}
                  helperText={touched.orderId ? errors.orderId : ''}
                  error={touched.orderId && !!errors.orderId}
                  isAutocomplete={USE_AUTOCOMPLETE}
                  value={values.orderId}
                />

                {(onEdit || !!orderId) && (
                  <FormControl className='field-form' fullWidth>
                    <TextField
                      id='discount-amount'
                      label='Descuento'
                      variant='outlined'
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e)
                        setDiscountAmount(e.target.value)
                      }}
                      value={values.discountAmount}
                      helperText={
                        touched.discountAmount ? errors.discountAmount : ''
                      }
                      error={touched.discountAmount && !!errors.discountAmount}
                      name='discountAmount'
                    />
                  </FormControl>
                )}
                {(onEdit || !!orderId) && (
                  <FormControl className='field-form' fullWidth>
                    <TextField
                      id='description'
                      label='Descripción de Facturación'
                      variant='outlined'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      helperText={touched.description ? errors.description : ''}
                      error={touched.description && !!errors.description}
                      name='description'
                    />
                  </FormControl>
                )}
              </MainCard>
              <MainCard className={'form-data'} title={'Preview'}>
                {!order ? (
                  <span>
                    Seleccione una orden para previsualizar la factura
                  </span>
                ) : (
                  <InvoiceTable
                    items={order.items}
                    discountAmount={discountAmount}
                  />
                )}
              </MainCard>
            </div>
            <MainCard className={'form-data flex-column'}>
              {errors.submit && (
                <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button
                variant='outlined'
                onClick={() => {
                  navigate('/clientela/bills')
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
  onEdit: boolean
  title: string
  initialValues: FormValues
}

export type FormValues = {
  orderId: number | null
  discountAmount: number
  description: string
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

  .container-form-bills {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* dos columnas de ancho igual */
    grid-column-gap: 20px; /* espacio entre las columnas */
  }

  @media screen and (max-width: 768px) {
    /* media query para dispositivos móviles */
    .container-form-bills {
      grid-template-columns: 1fr; /* una sola columna */
      grid-column-gap: 0; /* sin espacio entre columnas */
      padding: 0; /* sin padding */
    }
  }
`
