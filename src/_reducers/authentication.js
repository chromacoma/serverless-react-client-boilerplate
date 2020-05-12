import userConstants from '../_constants/user';

const initialState = {
  isSigningUp: false,
  isSignupConfirmed: false,
  isResendingSignupCode: false,
  isConfirmingSignup: false,
  isSigningIn: false,
  isSilentlySigningIn: false,
  isSignedIn: false,
  isChallenged: false,
  isSigningOut: false,
  isSendingForgotPasswordCode: false,
  isResendingForgotPasswordCode: false,
  isForgotPasswordCodeSent: false,
  isResettingPassword: false,
  isPasswordReset: false,
  challengeUser: null,
  authUser: null,
  error: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        error: null,
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        authUser: action.result,
      };
    case userConstants.SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        error: action.error,
      };
    case userConstants.SIGNUP_RESEND_CODE_REQUEST:
      return {
        ...state,
        isResendingSignupCode: true,
        error: null,
      };
    case userConstants.SIGNUP_RESEND_CODE_SUCCESS:
      return {
        ...state,
        isResendingSignupCode: false,
      };
    case userConstants.SIGNUP_RESEND_CODE_FAILURE:
      return {
        ...state,
        isResendingSignupCode: false,
        error: action.error,
      };
    case userConstants.SIGNUP_CONFIRMATION_REQUEST:
      return {
        ...state,
        isConfirmingSignup: true,
        error: null,
      };
    case userConstants.SIGNUP_CONFIRMATION_SUCCESS:
      return {
        ...state,
        isSignupConfirmed: true,
        isConfirmingSignup: false,
      };
    case userConstants.SIGNUP_CONFIRMATION_FAILURE:
      return {
        ...state,
        isConfirmingSignup: false,
        error: action.error,
      };
    case userConstants.SIGNIN_REQUEST:
      return {
        ...state,
        isSigningIn: true,
        isSignedIn: false,
        authUser: null,
        challengeUser: null,
      };
    case userConstants.SIGNIN_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: true,
        authUser: action.result,
      };
    case userConstants.SIGNIN_CHALLENGE:
      return {
        ...state,
        isSigningIn: false,
        isChallenged: true,
        challengeUser: action.result,
      };
    case userConstants.SIGNIN_FAILURE:
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: false,
        authUser: null,
        error: action.error,
      };
    case userConstants.SIGNOUT_REQUEST:
      return {
        ...state,
        isSigningOut: true,
      };
    case userConstants.SIGNOUT_SUCCESS:
      return {
        ...state,
        isSigningOut: false,
        isSignedIn: false,
        authUser: null,
      };
    case userConstants.SIGNOUT_FAILURE:
      return {
        ...state,
        isSigningOut: false,
        error: action.error,
      };
    case userConstants.CURRENT_SESSION_REQUEST:
      return {
        ...state,
        isSilentlySigningIn: true,
        isSignedIn: false,
        authUser: null,
      };
    case userConstants.CURRENT_SESSION_SUCCESS:
      return {
        ...state,
        isSilentlySigningIn: false,
        isSignedIn: true,
        authUser: action.result,
      };
    case userConstants.CURRENT_SESSION_FAILURE:
      return {
        ...state,
        isSilentlySigningIn: false,
        isSignedIn: false,
        authUser: null,
        error: action.error,
      };
    case userConstants.FORGOT_PASSWORD_CODE_REQUEST:
      return {
        ...state,
        isSendingForgotPasswordCode: true,
        isForgotPasswordCodeSent: false,
      };
    case userConstants.FORGOT_PASSWORD_CODE_SUCCESS:
      return {
        ...state,
        isSendingForgotPasswordCode: false,
        isForgotPasswordCodeSent: true,
        authUser: action.result,
      };
    case userConstants.FORGOT_PASSWORD_CODE_FAILURE:
      return {
        ...state,
        isSendingForgotPasswordCode: false,
        isForgotPasswordCodeSent: false,
        error: action.error,
      };

    case userConstants.FORGOT_PASSWORD_RESEND_CODE_REQUEST:
      return {
        ...state,
        isResendingForgotPasswordCode: true,
        isForgotPasswordCodeSent: false,
      };
    case userConstants.FORGOT_PASSWORD_RESEND_CODE_SUCCESS:
      return {
        ...state,
        isResendingForgotPasswordCode: false,
        isForgotPasswordCodeSent: true,
      };
    case userConstants.FORGOT_PASSWORD_RESEND_CODE_FAILURE:
      return {
        ...state,
        isResendingForgotPasswordCode: false,
        isForgotPasswordCodeSent: false,
        error: action.error,
      };
    case userConstants.FORGOT_PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        isResettingPassword: true,
        isPasswordReset: false,
      };
    case userConstants.FORGOT_PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        isResettingPassword: false,
        isPasswordReset: true,
      };
    case userConstants.FORGOT_PASSWORD_UPDATE_FAILURE:
      return {
        ...state,
        isResettingPassword: false,
        isPasswordReset: false,
        error: action.error,
      };
    case userConstants.FORGOT_PASSWORD_RESET:
      return {
        ...state,
        isSendingForgotPasswordCode: false,
        isForgotPasswordCodeSent: false,
        isResettingPassword: false,
        isPasswordReset: false,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
