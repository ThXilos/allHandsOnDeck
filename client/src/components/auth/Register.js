import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import axios from "axios";

export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger", 5000);
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Wrapper>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="top-part">
          <label className="form-labels" of="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
          ></input>
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
          <label className="form-labels" of="conf_pass">
            Confirm Password:
          </label>
          <input
            id="conf_pass"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
          ></input>
        </div>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        <div className="bottom-part">
          <button type="submit">Sign up</button>
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
