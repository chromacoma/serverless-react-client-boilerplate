import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import alertActions from '../../_actions/alert';
import userActions from '../../_actions/user';
import siteConstants from '../../_constants/site';
import ConfirmationCodeForm from '../../components/ConfirmationCodeForm';
import EnterEmailModal from '../../components/EnterEmailModal';

import './SignupConfirmation.scss';

export default function SignupConfirmation(props) {
  const authentication = useSelector((state) => state.authentication);
  const { isConfirmingSignup, error, authUser } = authentication;
  const email = authUser ? authUser.user.username : null;

  const dispatch = useDispatch();

  const [resendModalShow, setResendModalShow] = useState(false);
  const [codeModalShow, setCodeModalShow] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState(email);
  const [confirmationCode, setConfirmationCode] = useState();

  useEffect(() => {
    if (error && error.code === 'UserNotFoundException') {
      setConfirmationEmail('');
    }
  }, [error]);

  // handle email addresses coming back from the modal
  const codeEmailSubmit = (email) => {
    setCodeModalShow(false);
    setConfirmationEmail(email);
    confirmSignup(email, confirmationCode);
  };

  const resendEmailSubmit = (email) => {
    setResendModalShow(false);
    setConfirmationEmail(email);
    resendCode(email);
  };

  // handle form submit and link cllick
  const handleSignupConfirmationSubmit = (code) => {
    if (!confirmationEmail) {
      setCodeModalShow(true);
      setConfirmationCode(code);
    } else {
      confirmSignup(confirmationEmail, code);
    }
  };

  const handleResendCodeLink = (event) => {
    event.preventDefault();
    if (!confirmationEmail) {
      setResendModalShow(true);
    } else {
      resendCode(confirmationEmail);
    }
  };

  // perform the actions
  const confirmSignup = (email, code) => {
    dispatch(alertActions.clear());
    dispatch(userActions.confirmSignup(email, code));
  };

  const resendCode = (email) => {
    dispatch(alertActions.clear());
    dispatch(userActions.resendSignupCode(email));
  };

  return (
    <div className="SignupConfirmation">
      <Helmet>
        <title>{`Confirm your sign up | ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      <div className="row">
        <div className="col col-sm-8 offset-sm-2">
          <h2>Confirm your sign up</h2>
          <p>
            We've emailed you a code to confirm your signup. Enter it in the form below to finish your registration.
          </p>
          <p>
            <a href="!#" onClick={handleResendCodeLink}>
              Click here
            </a>{' '}
            to resend the email.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col col-sm-8 offset-sm-2 col-lg-4 offset-lg-4">
          <ConfirmationCodeForm submitAction={handleSignupConfirmationSubmit} isLoading={isConfirmingSignup} />
        </div>
      </div>
      <EnterEmailModal
        show={resendModalShow}
        handleEmailSubmit={resendEmailSubmit}
        onHide={() => setResendModalShow(false)}
      />
      <EnterEmailModal
        show={codeModalShow}
        handleEmailSubmit={codeEmailSubmit}
        onHide={() => setCodeModalShow(false)}
      />
    </div>
  );
}
