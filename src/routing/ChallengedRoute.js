import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ChallengedRoute({ children, ...rest }) {
  const authentication = useSelector((state) => state.authentication);
  const { isChallenged } = authentication;

  return <Route {...rest}>{isChallenged ? children : <Redirect to={`/`} />}</Route>;
}
