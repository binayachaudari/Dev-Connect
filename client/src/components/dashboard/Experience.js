import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Experience extends Component {
  static propTypes = {
    experiences: PropTypes.array.isRequired
  }

  getDate = (date) => {
    const ISODate = new Date(date);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return ISODate.toLocaleString('en', options);
  }

  render() {
    const { experiences } = this.props;
    const experince = experiences.map(exp => (
      <tr key={exp._id} >
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td className="hide-sm">
          {this.getDate(exp.from)} - {exp.to ? this.getDate(exp.to) : 'Current'}
        </td>
        <td>
          <button className="btn btn-danger">
            Delete
              </button>
        </td>
      </tr >
    ))
    return (
      <Fragment>
        <h2 className="my-2">Experience Credentials</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {experince}
          </tbody>
        </table>
      </Fragment>
    )
  }
}


export default connect()(Experience);
