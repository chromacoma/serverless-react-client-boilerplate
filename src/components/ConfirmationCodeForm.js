import React from 'react';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import LoaderButton from '../components/LoaderButton';

import './ConfirmationCodeForm.scss';

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
});
const validationSchemaWithPassword = Yup.object().shape({
  code: Yup.string().required('Code is required'),
  password: Yup.string().required('Please enter a password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please enter your password again'),
});

export default function ConfirmationCodeForm(props) {
  const { submitAction, isLoading, withPassword } = props;

  return (
    <Formik
      initialValues={{ code: '', password: '', confirmPassword: '' }}
      validationSchema={withPassword ? validationSchemaWithPassword : validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (withPassword) {
          const { code, password } = values;
          submitAction(code, password);
        } else {
          const { code } = values;
          submitAction(code);
        }
      }}
    >
      {/* Callback function containing Formik state and helpers that handle common form actions */}
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="confirmationCode">
            <Form.Label>Confirmation Code</Form.Label>
            <Form.Control
              autoFocus
              type="tel"
              name="code"
              onChange={handleChange}
              value={values.code}
              className={touched.code && errors.code ? 'is-invalid' : null}
            />
            {touched.code && errors.code && <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>}
            {!errors.code && <Form.Text className="text-muted">Please check your email for the code.</Form.Text>}
          </Form.Group>

          {withPassword && (
            <>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  className={touched.password && errors.password ? 'is-invalid' : null}
                />
                {touched.password && errors.password && (
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  className={touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : null}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                )}
              </Form.Group>
            </>
          )}
          <LoaderButton block type="submit" isLoading={isLoading} disabled={!isValid || isLoading}>
            {withPassword ? 'Reset Password' : 'Confirm'}
          </LoaderButton>
        </Form>
      )}
    </Formik>
  );
}
