import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

export class ProfileAbout extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    const {
      bio,
      skills,
      experience,
      education,
      user: { name }
    } = this.props.profile;
    return (
      <Fragment>
        {/* Bio */}
        <div className="profile-about bg-light p-2">
          {bio && (
            <Fragment>
              <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
              <p>{bio}</p>
              <div className="line"></div>
            </Fragment>
          )}

          {/* Skills */}
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {skills.map((skill, index) => (
              <div key={index} className="p-1">
                <i className="fa fa-check"></i> {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {experience.length > 0 ? (
            <Fragment>
              {experience.map((exp) => (
                <ProfileExperience key={exp._id} experience={exp} />
              ))}
            </Fragment>
          ) : (
            <h4>No Experience Yet...</h4>
          )}
        </div>

        {/* Education */}
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {education.length > 0 ? (
            <Fragment>
              {education.map((edu) => (
                <ProfileEducation key={edu._id} education={edu} />
              ))}
            </Fragment>
          ) : (
            <h4>No Experience Yet...</h4>
          )}
        </div>
      </Fragment>
    );
  }
}

export default ProfileAbout;
