import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Alert extends Component {
  static propTypes = {
    alerts: PropTypes.array.isRequired,
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.alerts.length < 1)
      window.scrollTo(0, 0);
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
