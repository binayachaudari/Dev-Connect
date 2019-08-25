import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export class ProfileAbout extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  }

  render() {
    const { bio,
      skills,
      user: { name }
    } = this.props.profile;
    return (
      <div className="profile-about bg-light p-2">
        {bio && (<Fragment>
          <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>
            {bio}
          </p>
          <div className="line"></div>
        </Fragment>)}

        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          {skills.map((skill, index) => (
            <div key={index} className="p-1"><i className="fa fa-check"></i> {skill}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default ProfileAbout;