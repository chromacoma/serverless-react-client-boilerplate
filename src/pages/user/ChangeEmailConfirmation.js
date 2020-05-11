import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import alertActions from '../../_actions/alert';
import userActions from '../../_actions/user';
import siteConstants from '../../_constants/site';
import ConfirmationCodeForm from '../../components/ConfirmationCodeForm';

import './ChangeEmailConfirmation.scss';

export default function ChangeEmailConfirmation(props) {
  const uaserStruct = useSelector((state) => state.user);
  const { isConfirmingEmail, user } = uaserStruct;
  const email = user ? user.email : null;

  const dispatch = useDispatch();

  // handle form submit and link cllick
  const handleChangeEmailConfirmationSubmit = (code) => {
    dispatch(alertActions.clear());
    dispatch(userActions.confirmUpdateEmail(code));
  };

  const handleResendCodeLink = (event) => {
    event.preventDefault();
    dispatch(userActions.resendUpdateEmailCode(email));
  };

  return (
    <div className="ChangeEmailConfirmation">
      <Helmet>
        <title>{`Confirm your email address | Settings |  ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      <div className="row">
        <div className="col col-sm-8 offset-sm-2">
          <h2>Confirm your sign up</h2>
          <p>We've emailed you a code to confirm your email change. Enter it in the form below to confirm it.</p>
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
          <ConfirmationCodeForm submitAction={handleChangeEmailConfirmationSubmit} isLoading={isConfirmingEmail} />
        </div>
      </div>
    </div>
  );
}
