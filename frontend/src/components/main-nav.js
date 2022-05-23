import {NavLink} from "react-router-dom";
import React from "react";
import AuthNav from './auth-nav';
import {useAuth0} from '@auth0/auth0-react';

const MainNav = () => {
  const {isAuthenticated} = useAuth0();
  return (
  <div className="bg-slate-900 w-full flex justify-between">
    <div className="flex">
      <NavLink
        to="/"
        className={"py-4 px-10 text-white hover:bg-slate-700"}
      >
        CRENTAL
      </NavLink>
    </div>
    <div className="flex items-center">
      <NavLink
        to="/"
        className={(navData) => (navData.isActive ? "py-4 px-10 text-white hover:bg-slate-700 bg-slate-700" : 'py-4 px-10 text-white hover:bg-slate-700')}
      >
        Home
      </NavLink>
      {isAuthenticated ? <NavLink
        to="/profile"
        className={(navData) => (navData.isActive ? "py-4 px-10 text-white hover:bg-slate-700 bg-slate-700" : 'py-4 px-10 text-white hover:bg-slate-700')}
      >
        Profile
      </NavLink> : null}
      {isAuthenticated ? <NavLink
        to="/cars"
        className={(navData) => (navData.isActive ? "py-4 px-10 text-white hover:bg-slate-700 bg-slate-700" : 'py-4 px-10 text-white hover:bg-slate-700')}
      >
        Cars
      </NavLink>: null }
      <AuthNav />
    </div>
  </div>
  )
};

export default MainNav;