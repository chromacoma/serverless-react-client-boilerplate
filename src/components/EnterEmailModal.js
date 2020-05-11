import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import LoaderButton from '../components/LoaderButton';

import './EnterEmailModal.scss';

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .required('Email is required'),
});

const EnterEmailModal = (props) => {
  const { handleEmailSubmit, ...rest } = props;

  return (
    <Modal {...rest} className="EnterEmailModal" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <h4>Please re-enter your email</h4>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={emailValidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const { email } = values;
            handleEmailSubmit(email);
          }}
        >
          {/* Callback function containing Formik state and helpers that handle common form actions */}
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="email">
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
              <LoaderButton block type="submit" disabled={!isValid}>
                Submit
              </LoaderButton>
            </Form>
          )}
        </Formik>{' '}
      </Modal.Body>
    </Modal>
  );
};

export default EnterEmailModal;
