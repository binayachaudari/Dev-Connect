import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile.action';
import Alert from '../layouts/Alert';
import Loading from '../layouts/Loading';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile === this.props.profile)
      this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { auth } = this.props;
    return (
      <div className='container'>
        <Alert />
        {(!profile && loading) ? <Loading /> :
          <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead username"><i className="fas fa-user"></i> Welcome {auth.user && auth.user.name}</p>
            {profile ? <Fragment>has</Fragment> :
              <Fragment>
                <p >Set up your Profile </p>
                <Link to='/create-profile' className='btn btn-primary-outline'>Create Profile</Link>
              </Fragment>}
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

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);