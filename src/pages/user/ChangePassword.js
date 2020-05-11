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

import './ChangePassword.scss';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required'),
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

const ChangePassword = () => {
  const userData = useSelector((state) => state.user);
  const { user, isUpdatingPassword } = userData;

  const dispatch = useDispatch();

  return (
    <div className="ChangePassword">
      <Helmet>
        <title>{`Change email | Settings | ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      {user && (
        <>
          <div className="row">
            <div className="col col-sm-8 offset-sm-2">
              <h2>Change your password</h2>
              <p>Use the form below to change your password.</p>
            </div>
          </div>
          <div className="row">
            <div className="col col-sm-8 offset-sm-2 col-lg-4 offset-lg-4">
              <Formik
                initialValues={{ oldPassword: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  const { oldPassword, password } = values;
                  dispatch(alertActions.clear());
                  dispatch(userActions.updatePassword(oldPassword, password));
                }}
              >
                {/* Callback function containing Formik state and helpers that handle common form actions */}
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="oldPassword">
                      <Form.Label>Old Password</Form.Label>
                      <Form.Control
                        autoFocus
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.oldPassword}
                        className={touched.oldPassword && errors.oldPassword ? 'is-invalid' : null}
                      />
                      {touched.oldPassword && errors.oldPassword && (
                        <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <hr />
                    <Form.Group controlId="password">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        className={touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : null}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <LoaderButton
                      block
                      type="submit"
                      isLoading={isUpdatingPassword}
                      disabled={!isValid || isUpdatingPassword}
                    >
                      Change Password
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

export default ChangePassword;
