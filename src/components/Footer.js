import React from 'react';
import { Navbar } from 'react-bootstrap';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="Footer">
      <Navbar fixed="bottom" bg="dark" variant="dark" expand="md" className="nav-bottom">
        <div className="container">
          <div className="footer">&copy; {new Date().getFullYear()} __COPYRIGHT__</div>
        </div>
      </Navbar>
    </div>
  );
};

export default Footer;
