import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth.action';

import PropTypes from 'prop-types';


class Navbar extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  authLinks = () => (
    <ul>
      <li><a href="#!" onClick={this.props.logout}>
        <i className='fas fa-sign-out-alt'></i>{' '}<span className='hide-sm'>Logout</span></a></li>
    </ul>
  )

  guestLinks = () => (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )



  render() {
    const { location } = this.props;
    const { isAuthenticated, loading } = this.props.auth;

    return (
      <nav className={location.pathname === '/' ? "navbar" : "navbar bg-dark"}>
        <h1>
          <Link to='/'><i className="fas fa-code"></i> Dev-Connect</Link>
        </h1>
        {!loading && (<Fragment> {isAuthenticated ? this.authLinks() : this.guestLinks()} </Fragment>)}
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logout })(Navbar));

