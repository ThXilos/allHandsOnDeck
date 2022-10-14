import React from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

import axios from "axios";

export const Login = ({ login, isAuthenticated, emailConfirmed }) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in.
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Wrapper>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="top-part">
          <label className="form-labels" of="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          ></input>
          <label className="form-labels" of="pass">
            Password:
          </label>
          <input
            id="pass"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          ></input>
        </div>
        <p>
          Dont have an account <Link to="/register">Sign Up</Link>
        </p>
        <div className="bottom-part">
          <button type="submit">Sign in</button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #e2fafc;
  height: 97vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  form {
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:2rem;
    p{
      font-size:0.8rem;
    a{
      all:unset;
      color:#395a8d;
      cursor:pointer;
    }
    }
    
  }

  .top-part {
    display: flex;
    flex-direction: column;
    width: 300px;
    label {
      color: #395a8d;
      margin: 1rem 0px;
      font-size: 1.2rem;
    }

    input {
      height: 30px;
      font-size: 1.2rem;
    }
  }

  .bottom-part {
    display: flex;
    justify-content: center;
    button {
        border: none;
        background: #395a8d;
        width: 120px;
        padding: 7px 9px;
        color: #ffff;
      }
      button:hover {
        cursor: pointer;
      }
    }
  }
`;

Login.proTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  emailConfirmed: state.auth.user?.emailConfirmed,
});
export default connect(mapStateToProps, { login })(Login);
