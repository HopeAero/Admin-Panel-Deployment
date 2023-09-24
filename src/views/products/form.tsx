import { Formik, FormikHelpers } from 'formik'
import { FunctionComponent } from 'react'
import * as Yup from 'yup'
// material-ui
import styled from 'styled-components'
import MainCard from 'components/cards/MainCard'
// import SelectField from 'components/SelectField'
import {
  Button,
  FormControl,
  // FormControlLabel,
  FormHelperText,
  TextField
  // Checkbox
} from '@mui/material'
import { useNavigate } from 'react-router'

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isCreate
}) => {
  const navigate = useNavigate()
  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('El nombre es requerido'),
          price: Yup.number()
            .notOneOf([0], 'El precio de venta no puede ser 0')
            .min(0, 'El precio de venta no puede ser negativo')
            .typeError('El precio es invalido')
            .required('El precio es requerido')
        })}
        onSubmit={onSubmit as any}
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
            <div className={isCreate ? '' : 'grid-container'}>
              <MainCard className={'form-data form-grid'} title={title}>
                <FormControl className='field-form' fullWidth>
                  <TextField
                    id='name'
                    label='Nombre del producto'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    helperText={touched.name ? errors.name : ''}
                    error={touched.name && !!errors.name}
                    name='name'
                  />
                </FormControl>
                <FormControl className='field-form' fullWidth>
                  <TextField
                    id='price'
                    label='Precio'
                    variant='outlined'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    helperText={touched.price ? errors.price : ''}
                    error={touched.price && !!errors.price}
                    name='price'
                  />
                </FormControl>
              </MainCard>

              {!!!isCreate && (
                <MainCard
                  className={'form-data info-grid'}
                  title={'Valor de Última Compra'}
                >
                  <div className={'grid-container-info'}>
                    <div>
                      <h3>ID de Compra</h3>
                      <div>6</div>
                    </div>
                    <div>
                      <h3>Cantidad Comprada</h3>
                      <div>10</div>
                    </div>
                    <div>
                      <h3>Precio Unitario en Compra</h3>
                      <div>3.87</div>
                    </div>
                    <div>
                      <h3>Fecha de Compra</h3>
                      <div>12/08/2023 - 06:30 PM</div>
                    </div>
                  </div>
                </MainCard>
              )}
            </div>

            <MainCard className={'form-data flex-column'}>
              {errors.submit && (
                <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button
                variant='outlined'
                onClick={() => {
                  navigate('/business/products')
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
  isCreate?: boolean
}

export type FormValues = {
  productId?: number
  name: string
  price: number
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

  .form-grid {
    grid-column: span 6;
  }

  .info-grid {
    grid-column: span 4;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-column-gap: 20px;
  }

  .grid-container-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
  }

  @media screen and (max-width: 768px) {
    /* media query para dispositivos móviles */
    .grid-container {
      grid-template-columns: 1fr; /* una sola columna */
      grid-column-gap: 0; /* sin espacio entre columnas */
      padding: 0; /* sin padding */
    }
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
