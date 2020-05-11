import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';

import alertActions from '../../_actions/alert';
import userActions from '../../_actions/user';
import siteConstants from '../../_constants/site';
import LoaderButton from '../../components/LoaderButton';

import './Signin.scss';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Please enter a password'),
});

const Signin = () => {
  const authentication = useSelector((state) => state.authentication);
  const { isSigningIn } = authentication;
  const dispatch = useDispatch();

  return (
    <div className="Signin">
      <Helmet>
        <title>{`Sign in | ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      <div className="row">
        <div className="col col-sm-8 offset-sm-2">
          <h2>Sign in</h2>
        </div>
      </div>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { email, password } = values;
          dispatch(alertActions.clear());
          dispatch(userActions.signin(email, password));
        }}
      >
        {/* Callback function containing Formik state and helpers that handle common form actions */}
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
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
            <LoaderButton block type="submit" isLoading={isSigningIn} disabled={!isValid || isSigningIn}>
              Sign in
            </LoaderButton>
            <Form.Text className="text-muted">
              <Link to="/signin/forgot">Forgot your password?</Link>
            </Form.Text>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
