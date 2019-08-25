import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByID } from '../../../actions/profile.action';
import PropTypes from 'prop-types';

import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import GithubProfile from './GithubProfile';

class Profile extends Component {
  static propTypes = {
    getProfileByID: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getProfileByID(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.loading !== this.props.profile.loading)
      this.props.getProfileByID(this.props.match.params.id);
  }

  render() {
    const { profile: { loading, profile }, auth } = this.props;
    return (
      <section className="container">
        <Link to="/developers" className="btn btn-light-outline" style={{ marginRight: '15px' }}>Back To Profiles</Link>
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

export default connect(mapStateToProps, { getProfileByID })(Profile);
