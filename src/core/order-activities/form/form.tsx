import { FunctionComponent, useState } from 'react'
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
// material-ui
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField
} from '@mui/material'
import styled from 'styled-components'
//import useServicesOptions from 'core/services/use-services-options';
import SelectField from 'components/SelectField'
// import useEmployeesOptions from 'core/employees/use-employees-options'
import useProductsOptions from 'services/products/_utils/use-products-options'
// import useActivitiesOptionsForServiceId from 'core/activities/use-activities-options-for-service-id'

const USE_AUTOCOMPLETES = false

const ActivitiesForm: FunctionComponent<Props> = ({
  className,
  onSubmit,
  initialValues,
  isUpdate,
  isParentUpdate
}) => {
  const isCreated = !isUpdate

  const productsOptions = useProductsOptions({
    onlyOnStock: true
  })

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={Yup.object().shape({
          productId: Yup.number().required('El producto es requerido'),
          quantity: Yup.number().min(1, 'La cantidad minima es 1')
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
            <FormControl
              className='field-form'
              fullWidth
              disabled={isParentUpdate && isUpdate}
            >
              <SelectField
                className='field-form'
                fullWidth={true}
                name='productId'
                disabled={isParentUpdate && isUpdate}
                onChange={handleChange}
                onBlur={handleBlur}
                label='Productos'
                options={productsOptions}
                helperText={touched.productId ? errors.productId : ''}
                error={touched.productId && !!errors.productId}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.productId}
              />
            </FormControl>
            <FormControl className='field-form' fullWidth>
              <TextField
                id='quantity'
                label='Cantidad de Producto'
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                helperText={touched.quantity ? errors.quantity : ''}
                error={touched.quantity && !!errors.quantity}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>Cantidad</InputAdornment>
                  )
                }}
                name='quantity'
              />
            </FormControl>
            {errors.submit && (
              <FormHelperText error>{errors.submit}</FormHelperText>
            )}
            <Button variant='outlined' type='submit' color='primary'>
              {isCreated ? 'Agregar' : 'Editar'}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}

interface Props {
  className?: string
  onSubmit: OnSubmit
  initialValues: OrderDetailFormValues
  isUpdate?: boolean
  isParentUpdate?: boolean
}

export type OrderDetailFormValues = {
  productId: number | null
  quantity: number
  isParentUpdate?: boolean
  submit: string | null
}

export type OnSubmit = (
  values: OrderDetailFormValues,
  helpers: FormikHelpers<OrderDetailFormValues>
) => void | Promise<any>

export default styled(ActivitiesForm)`
  display: flex;
  flex-direction: column;

  .container-form-services {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* dos columnas de ancho igual */
    grid-column-gap: 20px; /* espacio entre las columnas */
  }

  @media screen and (max-width: 768px) {
    /* media query para dispositivos móviles */
    .container-form-services {
      grid-template-columns: 1fr; /* una sola columna */
      grid-column-gap: 0; /* sin espacio entre columnas */
      padding: 0; /* sin padding */
    }
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .field-form {
    margin: 12px 0px;
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
