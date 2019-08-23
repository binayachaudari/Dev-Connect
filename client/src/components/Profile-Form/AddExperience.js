import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile.action';
import PropTypes from 'prop-types';

class AddExperience extends Component {
  state = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  }

  static propTypes = {
    addExperience: PropTypes.func.isRequired,
  }

  onChange = (e) => {
    const newFormData = { ...this.state };
    newFormData[e.target.name] = e.target.value;
    this.setState({ ...newFormData });
  }

  getMaxDate = () => {
    const today = new Date();
    let dd = today.getDay();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    return `${yyyy}-${mm}-${dd}`;
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addExperience({ ...this.state }, this.props.history)
  }

  render() {
    const {
      title, company, location, from, to, current, description,
    } = this.state;

    return (
      <section className="container">
        <h1 className="large text-primary">
          Add An Experience
      </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
      </p>
        <small className="required">* required field</small>
        <form className="form profile-form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input className="required" type="text" placeholder="* Job Title" name="title"
              value={title} onChange={this.onChange} required />
          </div>
          <div className="form-group">
            <input className="required" type="text" placeholder="* Company" name="company"
              value={company} onChange={this.onChange} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location" value={location} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" min="2000-01-01" max={this.getMaxDate()} value={from} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <p><input type="checkbox" name="current"
              value={current} onChange={(e) => { this.setState({ ...this.state, current: !current }); }} /> Current Job</p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" min="2000-01-01" max={this.getMaxDate()}
              value={to} onChange={this.onChange} disabled={current ? 'disabled' : ''} />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description} onChange={this.onChange}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
        </form>
      </section>
    )
  }
}

export default connect(null, { addExperience })(withRouter(AddExperience));