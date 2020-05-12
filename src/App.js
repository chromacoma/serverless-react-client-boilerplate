import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import userActions from './_actions/user';

import Routes from './routing/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import Alert from './components/Alert';

import './App.scss';
import { Container } from 'react-bootstrap';

const App = () => {
  const authentication = useSelector((state) => state.authentication);
  const { isSilentlySigningIn } = authentication;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.currentSession());
  }, [dispatch]);

  return (
    !isSilentlySigningIn && (
      <div className="App">
        <Header />
        <Container>
          <Alert />
          <Routes />
        </Container>
        <Footer />
      </div>
    )
  );
};

export default App;
