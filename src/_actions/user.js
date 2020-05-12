import { push } from 'connected-react-router';
import userConstants from '../_constants/user';
import userService from '../_services/user';
import alertActions from './alert';

const errorMessages = {
  LimitExceededException: "Sorry, you've sent too many codes! Try again later, or use that last one that you received.",
  UserNotFoundException: "Sorry, we couldn't find you. Check your spelling and try again.",
  CodeMismatchException: 'Sorry, that code is invalid. Please try again.',
  NotAuthorizedException: 'Sorry, that username or password is incorrect. Please try again.',
  AliasExistsException: 'Sorry, An account with that email address already exists.',
  InviteCodeException: 'Sorry, that invitation code is incorrect.',
};

const errorMessage = (error) => errorMessages[error.code] || `${error.message} [${error.code}]`;

const signup = (email, inviteCode, password) => {
  const request = () => ({ type: userConstants.SIGNUP_REQUEST });
  const success = (result) => ({ type: userConstants.SIGNUP_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.SIGNUP_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    if (inviteCode !== 'PaPtA7IbT5') {
      const error = { code: 'InviteCodeException' };
      dispatch(failure(error));
      dispatch(alertActions.error(errorMessage(error)));
    } else {
      userService.signup(email, password).then(
        (result) => {
          dispatch(success(result));
          dispatch(push('/signup/confirmation'));
          dispatch(alertActions.success("You've signed up!"));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(errorMessage(error)));
        }
      );
    }
  };
};

const confirmSignup = (email, code) => {
  const request = () => ({ type: userConstants.SIGNUP_CONFIRMATION_REQUEST });
  const success = (result) => ({ type: userConstants.SIGNUP_CONFIRMATION_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.SIGNUP_CONFIRMATION_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.confirmSignup(email, code).then(
      (result) => {
        dispatch(success());
        dispatch(push('/signin'));
        dispatch(alertActions.success("You've been confirmed! Please signin to continue :)"));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const resendSignupCode = (email) => {
  const request = () => ({ type: userConstants.SIGNUP_RESEND_CODE_REQUEST });
  const success = () => ({ type: userConstants.SIGNUP_RESEND_CODE_SUCCESS });
  const failure = (error) => ({ type: userConstants.SIGNUP_RESEND_CODE_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.resendSignupCode(email).then(
      () => {
        dispatch(success());
        dispatch(
          alertActions.success(
            `We've resent your confirmation code. Check ${email} and paste the code in the form below.`
          )
        );
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const signin = (username, password) => {
  const request = () => ({ type: userConstants.SIGNIN_REQUEST });
  const success = (result) => ({ type: userConstants.SIGNIN_SUCCESS, result });
  const challenge = (result) => ({ type: userConstants.SIGNIN_CHALLENGE, result });
  const failure = (error) => ({ type: userConstants.SIGNIN_FAILURE, error });

  return (dispatch) => {
    dispatch(request());
    userService.signin(username, password).then(
      (result) => {
        if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const user = result;
          const message = 'Welcome! You need to update your password.';
          dispatch(challenge(user));
          dispatch(alertActions.success(message));
          dispatch(push('/signin/new-password'));
        } else {
          const user = result.attributes;
          const message = "Welcome back! You've been logged in.";
          dispatch(success(user));
          dispatch(get());
          dispatch(alertActions.success(message));
        }
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const signout = () => {
  const request = () => ({ type: userConstants.SIGNOUT_REQUEST });
  const success = (result) => ({ type: userConstants.SIGNOUT_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.SIGNOUT_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.signout().then(
      (result) => {
        const message = "You've been signed out. See ya later!";
        dispatch(success(result));
        dispatch(push('/'));
        dispatch(alertActions.success(message));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const currentSession = () => {
  const request = () => ({ type: userConstants.CURRENT_SESSION_REQUEST });
  const success = (result) => ({ type: userConstants.CURRENT_SESSION_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.CURRENT_SESSION_FAILURE, error });

  return (dispatch) => {
    dispatch(request());
    userService.currentSession().then(
      (result) => {
        const user = result.getIdToken().payload;
        dispatch(get());
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
};

const forgotPasswordCode = (username) => {
  const request = () => ({ type: userConstants.FORGOT_PASSWORD_CODE_REQUEST });
  const success = (result) => ({ type: userConstants.FORGOT_PASSWORD_CODE_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.FORGOT_PASSWORD_CODE_FAILURE, error });

  return (dispatch) => {
    dispatch(request());
    userService.forgotPasswordCode(username).then(
      (result) => {
        const stubbedUser = {
          // mocks the user returned from AWS
          user: {
            username: username,
            blankedEmail: result.Destination,
          },
        };
        const message = 'Your code has been sent.';
        dispatch(success(stubbedUser));
        dispatch(push('/signin/forgot/reset'));
        dispatch(alertActions.success(message));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const resendForgotPasswordCode = (username) => {
  const request = () => ({ type: userConstants.FORGOT_PASSWORD_RESEND_CODE_REQUEST });
  const success = (result) => ({ type: userConstants.FORGOT_PASSWORD_RESEND_CODE_REQUEST, result });
  const failure = (error) => ({ type: userConstants.FORGOT_PASSWORD_RESEND_CODE_REQUEST, error });

  return (dispatch) => {
    dispatch(request());

    userService.resendForgotPasswordCode(username).then(
      (result) => {
        const stubbedUser = {
          // mocks the user returned from AWS
          user: {
            username: username,
            blankedEmail: result.Destination,
          },
        };
        const message = `We've resent your confirmation code. Check ${username} and paste the code in the form below.`;
        dispatch(success(stubbedUser));
        dispatch(alertActions.success(message));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const forgotPasswordUpdate = (username, code, password) => {
  const request = () => ({ type: userConstants.FORGOT_PASSWORD_UPDATE_REQUEST });
  const success = (result) => ({ type: userConstants.FORGOT_PASSWORD_UPDATE_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.FORGOT_PASSWORD_UPDATE_FAILURE, error });

  return (dispatch) => {
    dispatch(request());
    userService.forgotPasswordUpdate(username, code, password).then(
      (result) => {
        const message = 'Your password has been reset.';
        dispatch(success(result));
        dispatch(push('/signin'));
        dispatch(alertActions.success(message));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const get = () => {
  const request = () => ({ type: userConstants.GET_REQUEST });
  const success = (result) => ({ type: userConstants.GET_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.GET_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.get().then(
      (result) => dispatch(success(result)),
      (error) => dispatch(failure(error))
    );
  };
};

const update = (user) => {
  const request = () => ({ type: userConstants.UPDATE_REQUEST });
  const success = (result) => ({ type: userConstants.UPDATE_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.UPDATE_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.update(user).then(
      (result) => {
        const message = 'Your account has been updated.';
        dispatch(alertActions.success(message));
        dispatch(success(result));
      },
      (error) => {
        dispatch(alertActions.error(errorMessage(error)));
        dispatch(failure(error.toString()));
      }
    );
  };
};

const updateEmail = (user) => {
  const request = () => ({ type: userConstants.UPDATE_REQUEST });
  const success = (result) => ({ type: userConstants.UPDATE_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.UPDATE_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.update(user).then(
      (result) => {
        const message = 'Your email has been updated.';
        dispatch(alertActions.success(message));
        dispatch(push('/settings/email/confirmation'));
        dispatch(success(result));
      },
      (error) => {
        dispatch(alertActions.error(errorMessage(error)));
        dispatch(failure(error.toString()));
      }
    );
  };
};

const resendUpdateEmailCode = (email) => {
  const request = () => ({ type: userConstants.UPDATE_EMAIL_RESEND_CODE_REQUEST });
  const success = (result) => ({ type: userConstants.UPDATE_EMAIL_RESEND_CODE_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.UPDATE_EMAIL_RESEND_CODE_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.resendUpdateEmailCode().then(
      (result) => {
        const message = `We've resent your confirmation code. Check ${email} and paste the code in the form below.`;
        dispatch(success(result));
        dispatch(alertActions.success(message));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const confirmUpdateEmail = (code) => {
  const request = () => ({ type: userConstants.SIGNUP_CONFIRMATION_REQUEST });
  const success = (result) => ({ type: userConstants.SIGNUP_CONFIRMATION_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.SIGNUP_CONFIRMATION_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.confirmUpdateEmail(code).then(
      (result) => {
        dispatch(success());
        dispatch(push('/settings'));
        dispatch(alertActions.success('Your email has been updated.'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const challengePassword = (cognitoUser, newPassword) => {
  const request = () => ({ type: userConstants.UPDATE_PASSWORD_REQUEST });
  const success = (result) => ({ type: userConstants.UPDATE_PASSWORD_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.UPDATE_PASSWORD_FAILURE, error });

  return (dispatch) => {
    dispatch(request());
    userService.challengePassword(cognitoUser, newPassword).then(
      (result) => {
        const message = 'Your password has been updated. Log in to continue';
        dispatch(alertActions.success(message));
        dispatch(push('/signin'));
        dispatch(success(result));
      },
      (error) => {
        const message =
          error.code === 'NotAuthorizedException'
            ? 'Sorry, your password is incorrect. Please try again.'
            : errorMessage(error);
        dispatch(alertActions.error(message));
        dispatch(failure(error.toString()));
      }
    );
  };
};

const updatePassword = (oldPassword, newPassword) => {
  const request = () => ({ type: userConstants.UPDATE_PASSWORD_REQUEST });
  const success = (result) => ({ type: userConstants.UPDATE_PASSWORD_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.UPDATE_PASSWORD_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.updatePassword(oldPassword, newPassword).then(
      (result) => {
        const message = 'Your password has been updated.';
        dispatch(alertActions.success(message));
        dispatch(push('/settings'));
        dispatch(success(result));
      },
      (error) => {
        const message =
          error.code === 'NotAuthorizedException'
            ? 'Sorry, your password is incorrect. Please try again.'
            : errorMessage(error);
        dispatch(alertActions.error(message));
        dispatch(failure(error.toString()));
      }
    );
  };
};

const _delete = () => {
  const request = () => ({ type: userConstants.DELETE_REQUEST });
  const success = (result) => ({ type: userConstants.DELETE_SUCCESS, result });
  const failure = (error) => ({ type: userConstants.DELETE_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userService.delete().then(
      (result) => {
        dispatch(success());
        dispatch(push('/'));
        dispatch(alertActions.success('Your account has been deleted 😢'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(errorMessage(error)));
      }
    );
  };
};

const userActions = {
  signup,
  confirmSignup,
  resendSignupCode,
  signin,
  signout,
  currentSession,
  forgotPasswordCode,
  forgotPasswordUpdate,
  resendForgotPasswordCode,
  update,
  updateEmail,
  resendUpdateEmailCode,
  confirmUpdateEmail,
  challengePassword,
  updatePassword,
  delete: _delete,
};
export default userActions;
