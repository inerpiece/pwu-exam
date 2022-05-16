import {NavLink} from "react-router-dom";
import React from "react";

const MainNav = () => (
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      className="nav-link"
    >
      Home
    </NavLink>
    <NavLink
      to="/profile"
      className="nav-link"
    >
      Profile
    </NavLink>
    <NavLink
      to="/external-api"
      className="nav-link"
    >
      External API
    </NavLink>
  </div>
);

export default MainNav;