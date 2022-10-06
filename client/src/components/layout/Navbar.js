import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navbar = () => {
  return (
    <Wrapper>
      <nav className="">
        <h1>
          <Link to="/">
            <i></i>
            <span>*</span>Picka<span>roo</span>
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/pickaroos">
              <i></i>Pickaroos
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

export default Navbar;
