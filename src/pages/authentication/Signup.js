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

import './Signup.scss';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .required('Email is required'),
  inviteCode: Yup.string().required('An invite code is required to sign up'),
  password: Yup.string()
    .matches(/[A-Z]+/, 'Password must have a capital letter')
    .matches(/[0-9]+/, 'Password must have a number')
    .matches(
      /[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`]+/,
      'Password must contain one of these special characters: ^$*.[]{}()?-"!@#%&/,><\':;|_~`'
    )
    .matches(/[a-z]/, 'Password must have a lowercase letter')
    .max(100, 'Password must be less than 100 characters')
    .min(6, 'Password must be at least six characters')
    .required('Please enter a password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please enter your password again'),
});

export default function Signup(props) {
  const authentication = useSelector((state) => state.authentication);
  const { isSigningUp } = authentication;
  const dispatch = useDispatch();

  return (
    <div className="Signup">
      <Helmet>
        <title>{`Sign up | ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      <div className="row">
        <div className="col col-sm-8 offset-sm-2">
          <h2>Sign up</h2>
          <p>Fill in the form below. We'll email you a code to enter in the next step and complete your sign up.</p>
        </div>
      </div>
      <div className="row">
        <div className="col col-sm-8 offset-sm-2 col-lg-4 offset-lg-4">
          <Formik
            initialValues={{ email: '', inviteCode: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const { email, inviteCode, password } = values;
              dispatch(alertActions.clear());
              dispatch(userActions.signup(email, inviteCode, password));
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
                    className={
                      touched.email && errors.email ? 'is-invalid' : touched.email && !errors.email ? 'is-valid' : null
                    }
                  />
                  {touched.email && errors.email && (
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="inviteCode">
                  <Form.Label>Invitation Code</Form.Label>
                  <Form.Control
                    type="password"
                    name="inviteCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.inviteCode}
                    className={
                      touched.inviteCode && errors.inviteCode
                        ? 'is-invalid'
                        : touched.inviteCode && !errors.inviteCode
                        ? 'is-valid'
                        : null
                    }
                  />
                  {touched.inviteCode && errors.inviteCode && (
                    <Form.Control.Feedback type="invalid">{errors.inviteCode}</Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={
                      touched.password && errors.password
                        ? 'is-invalid'
                        : touched.password && !errors.password
                        ? 'is-valid'
                        : null
                    }
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
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    className={
                      touched.confirmPassword && errors.confirmPassword
                        ? 'is-invalid'
                        : touched.confirmPassword && !errors.confirmPassword
                        ? 'is-valid'
                        : null
                    }
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  )}
                </Form.Group>
                <LoaderButton block type="submit" isLoading={isSigningUp} disabled={!isValid || isSigningUp}>
                  Signup
                </LoaderButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
