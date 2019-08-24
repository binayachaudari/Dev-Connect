import React, { Component, Fragment } from 'react';
import { deleteExpOrEdu } from '../../actions/profile.action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Education extends Component {
  static propTypes = {
    educations: PropTypes.array.isRequired,
    deleteExpOrEdu: PropTypes.func.isRequired
  }

  getDate = (date) => {
    const ISODate = new Date(date);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return ISODate.toLocaleString('en', options);
  }

  render() {
    const { educations } = this.props;
    const education = educations.map(edu => (
      <tr key={edu._id} >
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td className="hide-sm">{edu.field_of_study}</td>
        <td className="hide-sm">
          {this.getDate(edu.from)} - {edu.to ? this.getDate(edu.to) : 'Current'}
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => this.props.deleteExpOrEdu(edu._id, 'education')}>
            Delete
              </button>
        </td>
      </tr >
    ))
    return (
      <Fragment>
        <h2 className="my-2">Education Credentials</h2>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Field of Study</th>
              <th className="hide-sm">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {education}
          </tbody>
        </table>
      </Fragment>
    )
  }
}


export default connect(null, { deleteExpOrEdu })(Education);
