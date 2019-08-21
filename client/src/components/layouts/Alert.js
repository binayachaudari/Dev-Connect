import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Alert extends Component {
  static propTypes = {
    alerts: PropTypes.array.isRequired,
  }

  render() {
    const { alerts } = this.props;
    return (
      alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>)
      )
    )
  }
}

const mapStateToProps = state => ({
  alerts: state.alert
})
export default connect(mapStateToProps)(Alert);
