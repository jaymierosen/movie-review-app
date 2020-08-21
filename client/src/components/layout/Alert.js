import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

// We map the state at the bottom.
// Grab the state.alert (array). If its not null and if its bigger than 0, we map through it and return a dinamic alert type (css class) and msg
const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(
  alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  )
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

// Mapping the redux state, so we have access through props
const mapStateToProps = state => ({
  alerts: state.alert
})

// Remember to pass mapStatetoProps inside the connect fn
export default connect(mapStateToProps)(Alert); 