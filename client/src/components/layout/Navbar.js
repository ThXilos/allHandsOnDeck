import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import styled from "styled-components";

export const Navbar = ({ isAuthenticated, loading, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href="#!">
          Log-out
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/pickaroos">
          <i></i>Pickaroons
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i></i>Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i></i>Login
        </Link>
      </li>
    </ul>
  );

  return (
    <Wrapper>
      <nav className="">
        <h1>
          <Link to="/">
            <i></i>
            <span>*</span>Picka<span>roon</span>
          </Link>
        </h1>
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  nav {
    display: flex;
    justify-content: space-around;
    padding: 0 1rem;
    align-items: center;
    background: #e2fafc;
  }

  nav ul {
    display: flex;
    list-style-type: none;
    gap: 1rem;
  }

  nav ul li a {
    color: #395a8d;
    text-decoration: none;
  }

  nav h1 a {
    font-size: 2rem;
    color: #395a8d;
    text-decoration: none;
  }

  nav h1 span {
    color: red;
  }
`;

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
