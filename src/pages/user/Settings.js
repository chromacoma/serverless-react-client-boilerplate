import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';

import { Formik } from 'formik';
import * as Yup from 'yup';

import alertActions from '../../_actions/alert';
import userActions from '../../_actions/user';
import siteConstants from '../../_constants/site';
import LoaderButton from '../../components/LoaderButton';

const validationSchema = Yup.object().shape({
  name: Yup.string(),
});

const Settings = () => {
  const userData = useSelector((state) => state.user);
  const { user, isUpdating } = userData;

  const dispatch = useDispatch();

  React.useEffect(() => {}, [user]);

  return (
    <div className="Settings">
      <Helmet>
        <title>{`Settings | ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      {user && (
        <>
          <div className="row">
            <div className="col-12">
              <h3>Settings for {user.name || user.email}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4>App settings</h4>
              <Formik
                initialValues={{ name: user.name || '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  dispatch(alertActions.clear());
                  dispatch(userActions.update(values));
                }}
              >
                {/* Callback function containing Formik state and helpers that handle common form actions */}
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        autoFocus
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    </Form.Group>
                    <LoaderButton block type="submit" isLoading={isUpdating} disabled={!isValid || isUpdating}>
                      Update
                    </LoaderButton>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="col-md-6">
              <h4>Authentication</h4>
              <p>
                <Link to="/settings/email">Click here</Link> to change your email address.
              </p>
              <p>
                <Link to="/settings/password">Click here</Link> to change your password.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Settings;
