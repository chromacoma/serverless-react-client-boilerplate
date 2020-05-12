import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticatedRoute from './AuthenticatedRoute';
import ChallengedRoute from './ChallengedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

import Loader from '../components/Loader';

// public pages
const HomePage = lazy(() => import('../pages/public/Home'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// authentication
const SigninPage = lazy(() => import('../pages/authentication/Signin'));
const SignupPage = lazy(() => import('../pages/authentication/Signup'));
const SignupConfirmationPage = lazy(() => import('../pages/authentication/SignupConfirmation'));
const ForgotPasswordPage = lazy(() => import('../pages/authentication/ForgotPassword'));
const ForgotPasswordResetPage = lazy(() => import('../pages/authentication/ForgotPasswordReset'));

const ChallengePasswordPage = lazy(() => import('../pages/authentication/ChallengePassword'));

// user pages
const UserDashboardPage = lazy(() => import('../pages/user/Dashboard'));
const UserSettingsPage = lazy(() => import('../pages/user/Settings'));
const UserChangePasswordPage = lazy(() => import('../pages/user/ChangePassword'));
const UserChangeEmailPage = lazy(() => import('../pages/user/ChangeEmail'));
const UserChangeEmailConfirmationPage = lazy(() => import('../pages/user/ChangeEmailConfirmation'));

// admin pages
// const AdminDashboardPage = lazy(() => import('./pages/admin/Dashboard'));

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <UnauthenticatedRoute path="/signup" exact>
          <SignupPage />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute path="/signup/confirmation" exact>
          <SignupConfirmationPage />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute path="/signin" exact>
          <SigninPage />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute path="/signin/forgot" exact>
          <ForgotPasswordPage />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute path="/signin/forgot/reset" exact>
          <ForgotPasswordResetPage />
        </UnauthenticatedRoute>

        <ChallengedRoute path="/signin/new-password" exact>
          <ChallengePasswordPage />
        </ChallengedRoute>

        <AuthenticatedRoute path="/dashboard" exact>
          <UserDashboardPage />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/settings" exact>
          <UserSettingsPage />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/settings/password" exact>
          <UserChangePasswordPage />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/settings/email" exact>
          <UserChangeEmailPage />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/settings/email/confirmation" exact>
          <UserChangeEmailConfirmationPage />
        </AuthenticatedRoute>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
