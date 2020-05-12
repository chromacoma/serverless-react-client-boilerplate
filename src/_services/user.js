import { Auth } from 'aws-amplify';

const signup = (email, password) => {
  return Auth.signUp(email, password);
};

const confirmSignup = (email, code) => {
  return Auth.confirmSignUp(email, code);
};

const resendSignupCode = (email) => {
  return Auth.resendSignUp(email);
};

const signin = (email, password) => {
  return Auth.signIn(email, password);
};

const signout = () => {
  return Auth.signOut();
};

const currentSession = () => {
  return Auth.currentSession();
};

const forgotPasswordCode = (username) => {
  return Auth.forgotPassword(username);
};

const resendForgotPasswordCode = (email) => {
  return Auth.forgotPassword(email);
};

const forgotPasswordUpdate = (username, code, password) => {
  return Auth.forgotPasswordSubmit(username, code, password);
};

const get = async () => {
  const currentUser = Auth.user || (await Auth.currentAuthenticatedUser());
  return Auth.userAttributes(currentUser).then(
    (result) => {
      const user = {};
      result.forEach((attr) => (user[attr.Name] = attr.Value));
      return user;
    },
    (error) => error
  );
};

const update = async (attributes) => {
  const currentUser = Auth.user || (await Auth.currentAuthenticatedUser());
  return Auth.updateUserAttributes(currentUser, attributes).then(
    (result) => new Promise((resolve, reject) => resolve(attributes)), // result is just 'SUCCESS' lol
    (error) => new Promise((resolve, reject) => reject(error))
  );
};

const resendUpdateEmailCode = (email) => {
  return Auth.verifyCurrentUserAttribute('email');
};

const confirmUpdateEmail = (code) => {
  return Auth.verifyCurrentUserAttributeSubmit('email', code);
};

const challengePassword = async (cognitoUser, newPassword) => {
  return Auth.completeNewPassword(cognitoUser, newPassword, []).then(
    (result) => new Promise((resolve, reject) => resolve(result)),
    (error) => new Promise((resolve, reject) => reject(error))
  );
};

const updatePassword = async (oldPassword, newPassword) => {
  const currentUser = Auth.user || (await Auth.currentAuthenticatedUser());
  return Auth.changePassword(currentUser, oldPassword, newPassword).then(
    (result) => new Promise((resolve, reject) => resolve(result)),
    (error) => new Promise((resolve, reject) => reject(error))
  );
};

const _delete = async () => {
  const currentUser = Auth.user || (await Auth.currentAuthenticatedUser());
  currentUser.deleteUser();
};

const userService = {
  signup,
  confirmSignup,
  resendSignupCode,
  signin,
  signout,
  currentSession,
  forgotPasswordCode,
  resendForgotPasswordCode,
  forgotPasswordUpdate,
  get,
  update,
  resendUpdateEmailCode,
  confirmUpdateEmail,
  challengePassword,
  updatePassword,
  delete: _delete,
};
export default userService;
