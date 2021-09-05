import React from 'react';

import logo from '../../Image/Logo/logo.svg';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';


import {
    BrowserRouter as Router,
} from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <Router>
      <Nav>
        <NavLink to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
        <Bars />
      </Nav>
      </Router>
    </>
  );
};

export default Navbar;
