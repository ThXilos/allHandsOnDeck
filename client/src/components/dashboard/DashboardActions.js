import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DashboardActions = () => {
  return (
    <Wrapper>
      <div>
        <Link to="/dashboard/edit-profile">
          <p>Edit Profile</p>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 300px;

    a {
      text-decoration: none;
    }
  }
`;

export default DashboardActions;
