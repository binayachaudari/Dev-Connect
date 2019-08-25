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
      <li><Link to="/developers">Developers</Link></li>
      <li><Link to="/dashboard">
        <i className='fas fa-user'></i>{' '}<span className='hide-sm'>Dashboard</span></Link></li>
      <li><a href="#!" onClick={this.props.logout}>
        <i className='fas fa-sign-out-alt'></i>{' '}<span className='hide-sm'>Logout</span></a></li>
      {this.props.auth.user &&
        <li><Link to={`/developers/profile/${this.props.auth.user._id}`}>
          <span className='nav-username'>
            {this.props.auth.user.name.trim().split(' ')[0]}</span></Link>
        </li>}

    </ul>
  )

  guestLinks = () => (
    <ul>
      <li><Link to="/developers">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )



  render() {
    const { location } = this.props;

    // eslint-disable-next-line
    const { isAuthenticated, loading } = this.props.auth;

    return (
      <nav className={location.pathname === '/' ? "navbar" : "navbar bg-dark"}>
        <h1>
          <Link to='/'><i className="fas fa-code"></i> Dev-Connect</Link>
        </h1>
        {/* {!loading && (<Fragment> {isAuthenticated ? this.authLinks() : this.guestLinks()} </Fragment>)} */}
        {(<Fragment> {localStorage.getItem('x-access-token') || isAuthenticated ? this.authLinks() : this.guestLinks()} </Fragment>)}
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logout })(Navbar));

