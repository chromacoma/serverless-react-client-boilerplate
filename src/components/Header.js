import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import userActions from '../_actions/user';

import './Header.scss';

const Header = (props) => {
  const authentication = useSelector((state) => state.authentication);
  const { isSilentlySigningIn, isSignedIn } = authentication;
  const userData = useSelector((state) => state.user);
  const { user } = userData;
  const username = user ? user.email : '';

  const dispatch = useDispatch();

  const [navExpanded, setNavExpanded] = useState(false);
  const toggleNav = (expanded) => setNavExpanded(expanded);
  const openNav = () => setNavExpanded(true);
  const closeNav = () => setNavExpanded(false);

  const signout = (event) => {
    event.preventDefault();
    dispatch(userActions.signout());
  };

  return (
    <div className="Header">
      <div className="container">
        <Navbar expand="md" variant="light" bg="light" onToggle={() => toggleNav()} expanded={navExpanded}>
          <Navbar.Brand>
            <Link to="/" className="logo" onClick={() => closeNav()}>
              __APP_NAME__
            </Link>
          </Navbar.Brand>
          {!isSilentlySigningIn && (
            <>
              <Navbar.Toggle onClick={() => openNav()} />
              <Navbar.Collapse>
                {isSignedIn && (
                  <Nav className="justify-content-start">
                    <LinkContainer onClick={() => closeNav()} to="/dashboard">
                      <Nav.Item>Dashboard</Nav.Item>
                    </LinkContainer>
                  </Nav>
                )}
                <Nav className="ml-auto justify-content-end">
                  {!isSignedIn && (
                    <>
                      <LinkContainer onClick={() => closeNav()} to="/signup">
                        <Nav.Item>Sign up</Nav.Item>
                      </LinkContainer>
                      <LinkContainer onClick={() => closeNav()} to="/signin">
                        <Nav.Item>Sign in</Nav.Item>
                      </LinkContainer>
                    </>
                  )}
                  {isSignedIn && (
                    <>
                      <Nav.Item>
                        Signed in as:{' '}
                        <Link to="/settings" onClick={() => closeNav()}>
                          {username}
                        </Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Link to="/signout" onClick={signout}>
                          Sign out
                        </Link>
                      </Nav.Item>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
