import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/css/App.css';

import Navbar from './components/layouts/Navbar';
import LandingPage from './components/layouts/HomePage';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/Profile-Form/CreateProfile';
import EditProfile from './components/Profile-Form/EditProfile';
import AddExperience from './components/Profile-Form/AddExperience';
import AddEducation from './components/Profile-Form/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';

import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/profile/Profile';
import AllPosts from './components/posts/AllPosts';

import SinglePost from './components/single-post/SinglePost';

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
          <Route exact path='/developers' component={Profiles} />
          <Route exact path='/developer/profile/:id' component={Profile} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
          <PrivateRoute exact path='/posts' component={AllPosts} />
          <PrivateRoute exact path='/post/:id' component={SinglePost} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
  )
}

export default App;
