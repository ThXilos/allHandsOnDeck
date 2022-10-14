import React from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
export const Landing = ({ auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Wrapper>
      <div className="container">
        <img
          className="img"
          src="https://static.vecteezy.com/system/resources/previews/005/547/559/original/cute-man-head-pirates-beard-logo-symbol-icon-design-illustration-vector.jpg"
          alt="pickaroo"
        />
        <h1>
          <span>*</span>Picka<span>roon</span>
        </h1>
      </div>
      <div className="actions">
        <Link to="/register">
          <button className="btn-register">Sign up</button>
        </Link>
        <Link to="/login">
          <button className="btn-login">Sign in</button>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #e2fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  min-height: 100vh;

  .container {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container h1 {
    margin-top: 30px;
    font-size: 3rem;
    color: #395a8d;
  }

  .container h1 span {
    color: red;
  }

  .actions {
    margin-bottom: 100px;
    display: flex;
    gap: 3rem;
  }

  .btn-register {
    border: none;
    background: #395a8d;
    width: 120px;
    padding: 7px 9px;
    color: #ffff;
  }
  .btn-register:hover {
    cursor: pointer;
  }

  .btn-login {
    border-style: solid;
    border-color: #395a8d;
    background: none;
    width: 120px;
    padding: 5px 7px;
    color: #395a8d;
  }

  .btn-login span {
    color: #395a8d;
  }

  .btn-login:hover {
    cursor: pointer;
  }

  .img {
    width: 50%;
    opacity: 0.4;
    border-radius: 100%;
    right: 25%;
    top: 16%;
  }
`;

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
