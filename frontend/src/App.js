import React from 'react';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/features/auth/Login';
import Register from './components/features/auth/Register'

import './App.css';

function App() {
  return (
    <Router>
    <div >
      <NavBar/>
      <Route exact path="/" component={Home}/>
      <div className="container">
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
