import React from 'react';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/features/auth/Login';
import Register from './components/features/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/features/profile/profileedit';
import AddExprience from './components/features/profile/addexprience';
import AddEducation from './components/features/profile/addeducation';
import './App.css';
import ProfileList from './components/features/profile/profilelist';
import ProfileView from './components/features/profile/profileview';
import Posts from './components/features/postfeed/post';
import Feeds from './components/features/postfeed/feeds';

function App() {
  return (
    <Router>
    <div >
      <NavBar/>
      <Route exact path="/" component={Home}/>
      <div className="container">
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/createProfile" component={EditProfile}/>
      <Route exact path="/exprience" component={AddExprience}/>
      <Route exact path="/education" component={AddEducation}/>
      <Route exact path="/profiles" component={ProfileList}/>
      <Route exact path="/profile" component={ProfileView}/>
      <Route exact path="/posts" component={Posts}/>
      <Route exact path="/feeds" component={Feeds}/>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
