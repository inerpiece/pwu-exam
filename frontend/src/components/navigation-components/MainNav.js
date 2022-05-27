import {NavLink} from "react-router-dom";
import React, { useState } from "react";
import AuthNav from './AuthNav';
import {useAuth0} from '@auth0/auth0-react';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeActiveState = () => {
    setIsOpen(prevState => prevState = !prevState)
  }
  const {isAuthenticated} = useAuth0();
  return (
    <div className="relative z-50">
      <div className="hidden md:flex bg-slate-900 w-full flex justify-between fixed">
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
      <div className="flex md:hidden bg-slate-900 w-full justify-between fixed">
        <div className="flex">
          <NavLink
            to="/"
            className={"py-4 px-10 text-white hover:bg-slate-700"}
          >
            CRENTAL
          </NavLink>
        </div>
        <div className="ml-10 py-2 px-6 border-2 border-slate-900 text-black text-2xl bg-white rounded-full hover:border-green-600 cursor-pointer" onClick={changeActiveState}>&#9776;</div>
        {isOpen ? <nav className="bg-slate-900 w-3/6 sm:w-2/6 absolute top-16 right-0 p-5">
          <div className="flex flex-col">
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? "py-4 px-10 text-white hover:bg-slate-700 bg-slate-700" : 'py-4 px-10 text-white hover:bg-slate-700')}
              onClick={changeActiveState}
            >
              Home
            </NavLink>
            {isAuthenticated ? <NavLink
              to="/profile"
              className={(navData) => (navData.isActive ? "py-4 px-10 text-white hover:bg-slate-700 bg-slate-700" : 'py-4 px-10 text-white hover:bg-slate-700')}
              onClick={changeActiveState}
            >
              Profile
            </NavLink> : null}
            {isAuthenticated ? <NavLink
              to="/cars"
              className={(navData) => (navData.isActive ? "py-4 px-10 text-white hover:bg-slate-700 bg-slate-700" : 'py-4 px-10 text-white hover:bg-slate-700')}
              onClick={changeActiveState}
            >
              Cars
            </NavLink>: null }
            <AuthNav />
          </div>
        </nav> : null}
      </div>
    </div>
  )
};

export default MainNav;