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

import './ChangeEmail.scss';

const ChangeEmail = () => {
  const userData = useSelector((state) => state.user);
  const { user, isUpdating } = userData;

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email address')
      .max(100, 'Email must be less than 100 characters')
      .test('notequal', 'Please enter a new email address', (value) => {
        return value !== user.email;
      })
      .required('Email is required'),
  });

  return (
    <div className="ChangeEmail">
      <Helmet>
        <title>{`Change email | Settings | ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      {user && (
        <>
          <div className="row">
            <div className="col col-sm-8 offset-sm-2">
              <h2>Change your email address</h2>
              <p>
                Fill in the form below. We'll then email you a code at the new address to enter in the next step to
                confirm it.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col col-sm-8 offset-sm-2 col-lg-4 offset-lg-4">
              <Formik
                initialValues={{ email: user.email }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  dispatch(alertActions.clear());
                  dispatch(userActions.updateEmail(values));
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
                        onBlur={handleBlur}
                        value={values.email}
                        className={touched.email && errors.email ? 'is-invalid' : null}
                      />
                      {touched.email && errors.email && (
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <LoaderButton block type="submit" isLoading={isUpdating} disabled={!isValid || isUpdating}>
                      Update
                    </LoaderButton>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChangeEmail;
