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
  initialValues
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
          name: Yup.string().max(30).required('El nombre es requerido'),
          email: Yup.string()
            .email('Debe ingresar un correo electrónico valido')
            .required('El correo electrónico es requerido'),
          password: Yup.string().max(30).required('Una contraseña es requerida')
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
              <FormControl fullWidth>
                <TextField
                  id='name'
                  label='Nombre de Administrador'
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
                  id='email'
                  label='Correo electrónico'
                  variant='outlined'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && !!errors.email}
                  name='email'
                />
              </FormControl>
              <FormControl className='field-form' fullWidth>
                <TextField
                  id='password'
                  label='Contraseña'
                  variant='outlined'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password ? errors.password : ''}
                  error={touched.password && !!errors.password}
                  name='password'
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
                  navigate('/business/admins')
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
  name: string
  email: string
  password: string
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
