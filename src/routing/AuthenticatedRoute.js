import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthenticatedRoute({ children, ...rest }) {
  const authentication = useSelector((state) => state.authentication);
  const { isSignedIn } = authentication;
  const { pathname, search } = useLocation();

  return <Route {...rest}>{isSignedIn ? children : <Redirect to={`/signin?redirect=${pathname}${search}`} />}</Route>;
}
