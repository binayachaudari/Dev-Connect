import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';

import Navbar from './components/layouts/Navbar';
import LandingPage from './components/layouts/HomePage';

import Login from './components/auth/Login';
import Register from './components/auth/Register';


const App = () =>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={LandingPage} />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </Fragment>
  </Router>


export default App;
