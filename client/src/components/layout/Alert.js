import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

const Alert = ({ alerts }) => (
  <Wrapper>
    {alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => (
        <div key={alert.id} className={`alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
  </Wrapper>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const Wrapper = styled.section`
  color: #ffff;
  .alert-danger {
    display: flex;
    justify-content: center;
    width: 100%;
    background: #bd281e;

    height: 30px;
    align-items: center;
  }
  .alert-success {
    display: flex;
    justify-content: center;
    width: 100%;
    background: #00816a;
    position: absolute;
    height: 30px;
    align-items: center;
  }
  .alert-warning {
    display: flex;
    justify-content: center;
    width: 100%;
    background: #ea9e1c;
    position: absolute;
    height: 30px;
    align-items: center;
  }
`;

export default connect(mapStateToProps)(Alert);
