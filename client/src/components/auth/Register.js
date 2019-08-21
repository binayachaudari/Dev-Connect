import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert.action';
import { register } from '../../actions/auth.action';

import Alert from '../layouts/Alert';

class Register extends Component {
  state = {
    formData: {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  }

  static propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
  }


  onChange = (e) => {
    const newFormData = { ...this.state.formData }
    newFormData[e.target.name] = e.target.value;

    this.setState({ formData: newFormData })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state.formData;

    if (password !== password2) {
      this.props.setAlert('Password Do not Match', 'danger', 3000);
    } else {
      // this.props.setAlert('Success', 'success', 3000);
      this.props.register({ name, email, password })
    }
  }

  render() {
    const { name, email, password, password2 } = this.state.formData;

    return (
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" value={name} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={this.onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    )
  }
}

export default connect(null, { setAlert, register })(Register);
