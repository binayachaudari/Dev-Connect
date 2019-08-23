import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/profile.action';
import Alert from '../layouts/Alert';
import PropTypes from 'prop-types';

class CreateProfile extends Component {
  state = {
    company: '',
    website: '',
    location: '',
    status: '',
    bio: '',
    github_username: '',
    skills: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linked_in: '',
    youtube: '',
    social_inputs: false
  }


  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
  }

  toggleSocialInputs = () => {
    this.setState({ ...this.state, social_inputs: !this.state.social_inputs })
  }

  onChange = (e) => {
    const newState = { ...this.state }
    newState[e.target.name] = e.target.value;

    this.setState({ ...newState });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateProfile({ ...this.state }, this.props.history)
  }

  render() {
    const {
      company,
      website,
      location,
      status,
      bio,
      github_username,
      skills,
      facebook,
      twitter,
      instagram,
      linked_in,
      youtube,
      social_inputs
    } = this.state;

    return (
      <section className="container">
        <Alert />
        <h1 className="large text-primary">
          Create Your Profile
      </h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make your
          profile stand out
      </p>
        <small className='required'>* required field</small>
        <form className="form profile-form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <select name="status" value={status} onChange={this.onChange} required>
              <option value="">Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="required"
            >* Give us an idea of where you are at in your career</small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Company" name="company" value={company} onChange={this.onChange} />
            <small className="form-text"
            >Could be your own company or one you work for</small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Website" name="website" value={website} onChange={this.onChange} />
            <small className="form-text"
            >Could be your own or a company website</small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location" value={location} onChange={this.onChange} />
            <small className="form-text"
            >City, state suggested (eg. Boston, MA)</small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Skills" name="skills" value={skills} onChange={this.onChange} />
            <small className="required"
            >* Please use comma separated values (eg.
            HTML, CSS, JavaScript, PHP)</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="github_username"
              value={github_username} onChange={this.onChange} />
            <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small>
          </div>
          <div className="form-group">
            <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={this.onChange}></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button onClick={this.toggleSocialInputs} type="button" className={`btn ${social_inputs ? "btn-primary" : "btn-light"}`}>
              Add Social Network Links
          </button>
            <small className="mx-1">Optional</small>
          </div>
          {social_inputs &&
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={this.onChange} />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={this.onChange} />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={this.onChange} />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" value={linked_in} onChange={this.onChange} />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={this.onChange} />
              </div>
            </Fragment>}

          <input type="submit" className="btn btn-primary my-1" />
        </form>
      </section>
    )
  }
}

export default connect(null, { updateProfile })(withRouter(CreateProfile));