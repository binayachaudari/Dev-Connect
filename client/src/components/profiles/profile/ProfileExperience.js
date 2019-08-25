import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProfileExperience extends Component {
  static propTypes = {
    experience: PropTypes.object.isRequired
  }

  getDate = (date) => {
    const ISODate = new Date(date);
    const options = { month: 'short', year: 'numeric', day: 'numeric' };
    return ISODate.toLocaleString('en', options);
  }

  render() {
    const { company, title, current, to, from, description } = this.props.experience;
    return (
      <div style={{ display: 'list-item', listStyle: 'disc' }}>
        <h3 className="text-dark">{company}</h3>
        <p>{this.getDate(from)} - {current ? 'Current' : this.getDate(to)}</p>
        <p><strong>Position: </strong>{title}</p>
        <p>
          <strong>Description: </strong>{description}
        </p>
      </div>
    )
  }
}

export default ProfileExperience;
