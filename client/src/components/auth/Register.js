import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert.action';

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
    setAlert: PropTypes.func.isRequired
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
      this.props.setAlert('Success', 'success', 3000);
      // const newUser = {
      //   name,
      //   email,
      //   password
      // }
      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     } 
      //   }
      //   const body = JSON.stringify(newUser);
      //   const res = await Axios.post('/api/auth/register', body, config);
      //   console.log(res.data);

      // } catch (err) {
      //   const { status, message } = err.response.data
      //   console.log(status, message)
      // }
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
            <input type="text" placeholder="Name" name="name" value={name} onChange={this.onChange} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={this.onChange} required />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="8"
              value={password}
              onChange={this.onChange}
              required />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="8"
              value={password2}
              onChange={this.onChange}
              required />
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

export default connect(null, { setAlert })(Register);
