// import './App.css';
// import Header from './components/Header/Header';
// import NavBar from './components/nav-bar';

// function App() {
//   return (
//     <div className="App">
//       <NavBar />
//     </div>
//   );
// }

// export default App;

// src/app.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import NavBar from './components/navigation-components/NavBar';
import Footer from './components/ui/Footer';
import Loading from './components/ui/Loading';
import SingleCar from './components/car-components/SingleCar';
import PageNotFound from './components/ui/PageNotFound';

import Home from './views/home';
import Profile from './views/profile';
import Cars from './views/cars';

import './App.css';
import ProtectedRoute from './auth/protected-route';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="">
      <NavBar />
      <div className="">
        <Routes>
          <Route path="/" exact element={<Home />} />
          {/* The below is the profile route, wrapped in a protected route component, unless isAuthenticated = true then it redirects to home */}
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route exact path='/profile' element={<Profile />} />
          </Route>
          <Route path="/cars" element={<ProtectedRoute />}>
            <Route path="/cars" element={<Cars />} />
            <Route path=":slug" element={<SingleCar />} /> {/* This needs to be changed if in /car-components/Car.js the window.location check is removed from the file and Outlet is no longer being used. */}
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
