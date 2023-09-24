import { FunctionComponent } from 'react'
import * as Yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
// material-ui
import MainCard from 'components/cards/MainCard'
import SelectField from 'components/SelectField'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import styled from 'styled-components'
import useSkillOptions from 'services/skill-categories/_utils/use-skill-categories-options'
import { useNavigate } from 'react-router'

const USE_AUTOCOMPLETE = false

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues
}) => {
  const skillOptions = useSkillOptions()
  const navigate = useNavigate()
  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          skillCategoryId: Yup.number().min(
            1,
            'Debe seleccionar una Categoria de Habilidad'
          ),
          name: Yup.string().min(1, 'Debe seleccionar una Billetera de Destino')
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
                name='skillCategoryId'
                onChange={handleChange}
                onBlur={handleBlur}
                label='Categoria de Habilidad'
                options={skillOptions}
                helperText={
                  touched.skillCategoryId ? errors.skillCategoryId : ''
                }
                error={touched.skillCategoryId && !!errors.skillCategoryId}
                isAutocomplete={USE_AUTOCOMPLETE}
                value={values.skillCategoryId}
              />
              <FormControl className='field-form' fullWidth>
                <TextField
                  id='name'
                  label='Nombre de Habilidad'
                  variant='outlined'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  helperText={touched.name ? errors.name : ''}
                  error={touched.name && !!errors.name}
                  name='name'
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
                  navigate('/general/skills')
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
  skillCategoryId: number
  name: string
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
