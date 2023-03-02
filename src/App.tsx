import React from 'react';

import './App.css';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './components/pages/Login';
import Header from './components/pages/Header';
import Register from "./components/pages/Register";

function App() {
  const isLoggedIn = !!localStorage.getItem("auth-token");
  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                  <Route path='/home' element={<Home/>} />
                  <Route path='/profile' element={<Profile/>} />
                  <Route path="/login" element={ <Login /> } />
                  <Route path="/register" element={ <Register /> } />
              </Routes>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
