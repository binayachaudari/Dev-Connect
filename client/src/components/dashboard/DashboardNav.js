import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardNav extends Component {
  render() {
    return (
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary mr-1"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-primary mr-1"></i> Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary mr-1"></i> Add Education
        </Link>
      </div>
    );
  }
}

export default DashboardNav;
