import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    formData: {
      email: '',
      password: '',
    }
  };

  onChange = (e) => {
    const newFormData = { ...this.state.formData }
    newFormData[e.target.name] = e.target.value;

    this.setState({ formData: newFormData })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state.formData;
    console.log(email, password);
  }

  render() {
    const { email, password } = this.state.formData;

    return (
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
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
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    )
  }
}

export default Login;
