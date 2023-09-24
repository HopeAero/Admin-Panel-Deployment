import { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
// material-ui
import MainCard from 'components/cards/MainCard';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import styled from 'styled-components';

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({ className, title, onSubmit, initialValues }) => {

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={
          Yup.object().shape({
            description: Yup.string().max(30).required('La descripcion del cargo es requerido'),
          })
        }
        onSubmit={onSubmit as any}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <MainCard className={'form-data'} title={title}>
              <FormControl fullWidth>
                <TextField
                  id="description"
                  label="Descripcion de cargo"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  helperText={touched.description ? errors.description : ''}
                  error={touched.description && !!errors.description}
                  name="description"
                />
              </FormControl>
            </MainCard>
            <MainCard className={'form-data flex-column'}>
              {errors.submit && (
                  <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button variant="outlined" type="submit" color="primary">
                Guardar
              </Button>
            </MainCard>

          </form>
        )}
      </Formik>
    </div>
  );
};

interface Props {
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
}

export type FormValues = {
  description: string;
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;


export default styled(Form)`
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
`;
