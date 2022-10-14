import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ auth: { loading, isAuthenticated }, children }) => {
  if (!loading && !isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
