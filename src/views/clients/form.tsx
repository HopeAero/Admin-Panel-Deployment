import { FunctionComponent } from 'react'
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
// material-ui
import MainCard from 'components/cards/MainCard'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import styled from 'styled-components'
import { useNavigate } from 'react-router'

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate
}) => {
  const navigate = useNavigate()
  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(30)
            .required('El nombre del cliente es requerido'),
          mainPhone: Yup.string()
            .max(16, 'El número de teléfono no puede exceder los 16 carácteres')
            .nullable(),
          secondaryPhone: Yup.string()
            .max(16, 'El número de teléfono no puede exceder los 16 carácteres')
            .nullable()
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
              <FormControl className='field-form' fullWidth>
                <TextField
                  id='name'
                  label='Nombre del cliente'
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
                  id='mainPhone'
                  label='Teléfono principal'
                  variant='outlined'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mainPhone}
                  helperText={touched.mainPhone ? errors.mainPhone : ''}
                  error={touched.mainPhone && !!errors.mainPhone}
                  name='mainPhone'
                />
              </FormControl>
              <FormControl className='field-form' fullWidth>
                <TextField
                  id='secondaryPhone'
                  label='Teléfono secundario'
                  variant='outlined'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.secondaryPhone}
                  helperText={
                    touched.secondaryPhone ? errors.secondaryPhone : ''
                  }
                  error={touched.secondaryPhone && !!errors.secondaryPhone}
                  name='secondaryPhone'
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
                  navigate('/clientela/clients')
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
  isUpdate?: boolean
  className?: string
  onSubmit: OnSubmit
  title: string
  initialValues: FormValues
}

export type FormValues = {
  name: string
  mainPhone: string
  secondaryPhone: string
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
