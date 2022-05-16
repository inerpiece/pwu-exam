// src/components/nav-bar.js

import React from 'react';

import MainNav from './main-nav';
import AuthNav from './auth-nav';
// import LoginButton from './login-button'
// import LogoutButton from './logout-button'
// import {useAuth0} from '@auth0/auth0-react'

const NavBar = () => {
  // const {isAuthenticated} = useAuth0();
  // console.log('isAuthenticated', isAuthenticated)
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <MainNav />
          <AuthNav />
          {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;