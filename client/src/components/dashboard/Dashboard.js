import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile.action';
import { deleteAccount } from '../../actions/profile.action';
import Alert from '../layouts/Alert';
import Loading from '../layouts/Loading';
import DashboardNav from './DashboardNav';
import Experience from './Experience';
import Education from './Education';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.profile.loading !== this.props.profile.loading)
  //     this.props.getCurrentProfile();
  // }

  render() {
    const { profile, loading } = this.props.profile;
    const { auth } = this.props;
    return (
      <div className='container'>
        <Alert />
        {(loading) ? <Loading /> :
          <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead username"><i className="fas fa-user"></i> Welcome {auth.user && auth.user.name}</p>
            {profile ? <DashboardNav /> :
              <Fragment>
                <p >Set up your Profile </p>
                <Link to='/create-profile' className='btn btn-primary-outline'>Create Profile</Link>
              </Fragment>}
            {profile && profile.experience.length > 0 && <Experience experiences={profile.experience} />}
            {profile && profile.education.length > 0 && <Education educations={profile.education} />}
            <div className="my-2"><button className="btn btn-danger-outline" onClick={this.props.deleteAccount}>
              <i className="fas fa-user-minus mr-1"></i>
              Delete Account
              </button></div>
          </Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);