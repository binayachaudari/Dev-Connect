import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile.action';
import PropTypes from 'prop-types';

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    field_of_study: '',
    from: '',
    to: '',
    current: false,
    description: '',
  }

  static propTypes = {
    addEducation: PropTypes.func.isRequired,
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
    this.props.addEducation({ ...this.state }, this.props.history)
  }

  render() {
    const {
      school, degree, field_of_study, from, to, current, description,
    } = this.state;

    return (
      <section className="container">
        <h1 className="large text-primary">
          Add An Experience
      </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any school, bootcamp, etc that
        you have attended...
      </p>
        <small className="required">* required field</small>
        <form className="form profile-form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input className="required" type="text" placeholder="* School or Bootcamp" name="school"
              value={school} onChange={this.onChange} required />
          </div>
          <div className="form-group">
            <input className="required" type="text" placeholder="* Degree or Certificate" name="degree"
              value={degree} onChange={this.onChange} required />
          </div>
          <div className="form-group">
            <input type="text" className="required" placeholder="* Field Of Study" name="field_of_study" value={field_of_study} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <h4>* From Date</h4>
            <input type="date" className="required" name="from" min="2000-01-01" max={this.getMaxDate()} value={from} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <p><input type="checkbox" name="current" className="required mr-1"
              value={current} onChange={(e) => { this.setState({ ...this.state, current: !current }); }} />  Current School or Bootcamp</p>
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
              placeholder="Education Description"
              value={description} onChange={this.onChange}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
        </form>
      </section>
    )
  }
}

export default connect(null, { addEducation })(withRouter(AddEducation));