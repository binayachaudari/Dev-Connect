import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileEducation extends Component {
  static propTypes = {
    education: PropTypes.object.isRequired
  };

  getDate = (date) => {
    const ISODate = new Date(date);
    const options = { month: 'short', year: 'numeric', day: 'numeric' };
    return ISODate.toLocaleString('en', options);
  };

  render() {
    const { school, degree, field_of_study, current, to, from, description } = this.props.education;
    return (
      <div style={{ display: 'list-item', listStyle: 'disc' }}>
        <h3 className="text-dark">{school}</h3>
        <p>
          {this.getDate(from)} - {current ? 'Current' : this.getDate(to)}
        </p>
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {field_of_study}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    );
  }
}

export default ProfileEducation;
