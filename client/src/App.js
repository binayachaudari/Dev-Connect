import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';

import Navbar from './components/layouts/Navbar';
import LandingPage from './components/layouts/HomePage';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/Profile-Form/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';

/**
 * REDUX
 */
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth.action';

const App = () => {
  // Similar to componentDidMount
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (<Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={LandingPage} />
        <Switch>
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
  )
}

export default App;
