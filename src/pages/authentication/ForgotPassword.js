import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';

import alertActions from '../../_actions/alert';
import userActions from '../../_actions/user';
import siteConstants from '../../_constants/site';
import LoaderButton from '../../components/LoaderButton';

import './ForgotPassword.scss';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email address').required('Email is required'),
});

export default function ForgotPassword() {
  const authentication = useSelector((state) => state.authentication);
  const { isSendingForgotPasswordCode } = authentication;
  const dispatch = useDispatch();

  return (
    <div className="ForgotPassword">
      <Helmet>
        <title>{`Forgot Password | ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      <div className="row">
        <div className="col col-sm-8 offset-sm-2">
          <h2>Forgot Password</h2>
          <p>Enter your email below and we'll email you a code to reset your password.</p>
        </div>
      </div>
      <div className="row">
        <div className="col col-sm-8 offset-sm-2 col-lg-4 offset-lg-4">
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const { email } = values;
              dispatch(alertActions.clear());
              dispatch(userActions.forgotPasswordCode(email));
            }}
          >
            {/* Callback function containing Formik state and helpers that handle common form actions */}
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    className={touched.email && errors.email ? 'is-invalid' : null}
                  />
                  {touched.email && errors.email && (
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  )}
                </Form.Group>
                <LoaderButton
                  block
                  type="submit"
                  isLoading={isSendingForgotPasswordCode}
                  disabled={!isValid || isSendingForgotPasswordCode}
                >
                  Send Code
                </LoaderButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
