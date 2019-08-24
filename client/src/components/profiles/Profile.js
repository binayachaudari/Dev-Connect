import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Loading from '../layouts/Loading';
import ProfileItem from './ProfileItem';
import { getAllProfile } from '../../actions/profile.action';
import PropTypes from 'prop-types';

class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getAllProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.loading !== this.props.profile.loading)
      this.props.getAllProfile();
  }

  render() {
    const { loading, developer_profiles } = this.props.profile;
    return (
      <section className="container">
        {loading ? <Loading /> : <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers</p>
          <div className="profiles">
            {developer_profiles.length > 0 ? (developer_profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))) : <h4>No Developer Profiles...</h4>}
          </div>
        </Fragment>}

      </section>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfile })(Profile);
