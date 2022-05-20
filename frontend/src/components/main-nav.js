import {NavLink} from "react-router-dom";
import React from "react";
import AuthNav from './auth-nav';

const MainNav = () => (
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
      <NavLink
        to="/profile"
        className={(navData) => (navData.isActive ? "py-4 px-10 text-white hover:bg-slate-700 bg-slate-700" : 'py-4 px-10 text-white hover:bg-slate-700')}
      >
        Profile
      </NavLink>
      <NavLink
        to="/cars"
        className={(navData) => (navData.isActive ? "py-4 px-10 text-white hover:bg-slate-700 bg-slate-700" : 'py-4 px-10 text-white hover:bg-slate-700')}
      >
        Cars
      </NavLink>
      <AuthNav />
    </div>
  </div>
);

export default MainNav;