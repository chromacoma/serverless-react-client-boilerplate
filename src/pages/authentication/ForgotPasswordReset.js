import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import alertActions from '../../_actions/alert';
import userActions from '../../_actions/user';
import siteConstants from '../../_constants/site';
import ConfirmationCodeForm from '../../components/ConfirmationCodeForm';
import EnterEmailModal from '../../components/EnterEmailModal';

import './ForgotPasswordReset.scss';

export default function ForgotPasswordReset() {
  const authentication = useSelector((state) => state.authentication);
  const { isResetingPassword, error, authUser } = authentication;
  const email = authUser ? authUser.user.username : null;

  const dispatch = useDispatch();

  const [resendModalShow, setResendModalShow] = useState(false);
  const [codeModalShow, setCodeModalShow] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState(email);
  const [confirmationCode, setConfirmationCode] = useState();
  const [confirmationPassword, setConfirmationPassword] = useState();

  useEffect(() => {
    if (error && error.code === 'UserNotFoundException') {
      setConfirmationEmail('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // handle email addresses coming back from the modal
  const codeEmailSubmit = (email) => {
    setCodeModalShow(false);
    setConfirmationEmail(email);
    resetPassword(email, confirmationCode, confirmationPassword);
  };

  const resendEmailSubmit = (email) => {
    setResendModalShow(false);
    setConfirmationEmail(email);
    resendCode(email);
  };

  // handle form submit and link cllick
  const handleForgotPasswordResetSubmit = (code, password) => {
    if (!confirmationEmail) {
      setCodeModalShow(true);
      setConfirmationCode(code);
      setConfirmationPassword(password);
    } else {
      resetPassword(confirmationEmail, code, password);
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
  const resetPassword = (username, code, password) => {
    dispatch(alertActions.clear());
    dispatch(userActions.forgotPasswordUpdate(username, code, password));
  };

  const resendCode = (email) => {
    dispatch(alertActions.clear());
    dispatch(userActions.resendForgotPasswordCode(email));
  };

  return (
    <div className="ForgotPasswordReset">
      <Helmet>
        <title>{`Reset your password | ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      <div className="row">
        <div className="col col-sm-8 offset-sm-2">
          <h2>Reset your password</h2>
          <p>
            We've emailed you a code to confirm your email address. Enter it in the form below with your new password to
            reset it.
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
          <ConfirmationCodeForm
            submitAction={handleForgotPasswordResetSubmit}
            withPassword={true}
            isLoading={isResetingPassword}
          />
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
