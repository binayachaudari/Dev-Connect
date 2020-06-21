import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PrivateRoute extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuthenticated, loading } = this.props.auth;

    return (!isAuthenticated && !loading) || !localStorage.getItem('x-access-token') ? (
      <Redirect to="/login" {...rest} />
    ) : (
      <Component {...this.props} {...rest} />
    );
    // <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component {...props} />)} />
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
