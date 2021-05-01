import React from "react";
import { connect } from "react-redux";


const AlertComponent = ({ alerts }) =>
  alerts !== null && alerts.length > 0 && alerts.map((alert) => (
    <div id={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
  ));


const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(AlertComponent);
