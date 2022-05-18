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

import NavBar from './components/nav-bar';
import Footer from './components/footer';
import Loading from './components/loading';

import Home from './views/home';
import Profile from './views/profile';

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
          {/* <Route path="/external-api" component={ExternalApi} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
