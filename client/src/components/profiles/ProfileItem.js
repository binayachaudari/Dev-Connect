import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileItem extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  }

  render() {
    const {
      user: { _id, name, avatar },
      status,
      company,
      location,
      skills
    } = this.props.profile
    return (
      <div>
        <div className="profile bg-light">
          <img
            className="round-img"
            src={avatar}
            alt={name}
          />
          <div>
            <h2>{name}</h2>
            <p>{status} {company && <span>at {company}</span>}</p>
            <p>{location && <span>{location}</span>}</p>
            <Link to={`/developers/profile/${_id}`} className="btn btn-primary-outline" style={{ borderRadius: '5px' }}>View Profile</Link>
          </div>

          <ul>
            {skills.slice(0, 7).map((skill, index) => (
              <li key={index} className="text-primary">
                <i className="fas fa-check-circle"></i> {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ProfileItem;
