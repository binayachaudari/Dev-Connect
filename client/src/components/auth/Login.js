import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth.action';
import Alert from '../layouts/Alert';

import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    button: {
      loading: false
    }
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  onChange = (e) => {
    const newFormData = { ...this.state.formData };
    newFormData[e.target.name] = e.target.value;

    this.setState({ formData: newFormData });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state.formData;
    this.setState({ button: { loading: true } });
    this.props.login(email, password);
  };

  render() {
    const { email, password } = this.state.formData;
    const {
      button: { loading }
    } = this.state;
    const { isAuthenticated } = this.props;

    if (localStorage.getItem('x-access-token')) {
      return <Redirect to="/dashboard" />;
    }

    //Redirect to dashboard
    if (isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.onChange}
              required
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value={loading ? 'Loading...' : 'Login'}
            disabled={loading}
          />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
