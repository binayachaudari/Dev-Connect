import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


class ProfileTop extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  }

  render() {
    const { user: { name, avatar },
      status,
      company,
      location,
      website,
      social,
    } = this.props.profile;

    return (
      <div className="profile-top bg-primary p-2">
        <LazyLoadImage
          className="round-img my-1"
          effect="blur"
          src={avatar}
          alt={name}
        />
        <h1 className="large">{name}</h1>
        <p className="lead">{status} {company && <span>at {company}</span>}</p>
        <p>{location && <span>{location}</span>}</p>

        <div className="icons my-1">
          {website && <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>}
          {social && (
            <Fragment>
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              )}

              {social.linked_in && (
                <a href={social.linked_in} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              )}

              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-2x"></i>
                </a>
              )}

              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              )}
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default ProfileTop
