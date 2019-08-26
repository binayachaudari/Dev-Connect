import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByID, updateDevProfile } from '../../../actions/profile.action';
import PropTypes from 'prop-types';

import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import GithubProfile from './GithubProfile';

class Profile extends Component {
  state = {
  }

  static propTypes = {
    getProfileByID: PropTypes.func.isRequired,
    updateDevProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    const dev_profile = this.props.profile.developer_profiles.find(val => val.user._id === this.props.match.params.id);
    if (dev_profile) {
      this.props.updateDevProfile(dev_profile);
    }

    this.props.getProfileByID(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.profile === this.props.profile.profile)
      this.props.getProfileByID(this.props.match.params.id);
  }

  render() {
    const { profile: { loading, profile }, auth } = this.props;
    return (
      <section className="container">
        <Link to="/developers" className="btn btn-light-outline" style={{ marginRight: '15px' }}>Back To Developers</Link>
        {(!loading && profile && !auth.loading && auth.isAuthenticated) ?
          profile.user._id === auth.user._id &&
          (<Link to="/edit-profile" className="btn btn-light-outline" style={{ marginRight: '15px' }}>Edit Profile</Link>) : ''}

        <div className="profile-grid my-1">
          {(!profile) ? <h4>Loading...</h4> : <Fragment>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            {profile.github_username && <GithubProfile username={profile.github_username} />}
          </Fragment>
          }
        </div>
      </section >
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getProfileByID, updateDevProfile })(Profile);
