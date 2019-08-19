import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const { location } = this.props;

    return (
      <nav className={location.pathname === '/' ? "navbar" : "navbar bg-dark"}>
        <h1>
          <Link to='/'><i className="fas fa-code"></i> Dev-Connect</Link>
        </h1>
        <ul>
          <li><Link to="/profiles">Developers</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Navbar);

