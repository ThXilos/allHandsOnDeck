import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiHeart, FiEye } from "react-icons/fi";
import styled from "styled-components";

function ProfileItem({
  profile: {
    status,
    user: { _id, name, avatar },
    skills,
    likes,
  },
}) {
  const shortSkill = skills.slice(0, 3);
  return (
    <Wrapper>
      <div className="top-part">
        <img src={avatar} alt="user_pic" />
        <div className="user-info">
          <h1>{name}</h1>
          <h2>{status}</h2>
          <div className="skill-set">
            {shortSkill.map((skill, index) => (
              <p>{skill}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-part">
        <Link to={`/profile/${_id}`}>
          <button className="view-profile-btn">View</button>
        </Link>
        <p className="like-display">
          <FiHeart />
          {likes.length}
        </p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  width: 450px;
  height: 200px;
  box-shadow: 0 0 1px 0px;
  border-radius: 5px;
  background: linear-gradient(135deg, #395a8d 15%, #ffff 1%);
  .top-part {
    display: flex;
    align-items: flex-start;
    img {
      width: 20%;
      border-radius: 100%;
    }
    .user-info {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      h1 {
        margin: 0;
        opacity: 0.8;
        font-weight: normal;
      }

      h2 {
        margin: 0;
        font-size: 1rem;
        opacity: 0.7;
        font-weight: normal;
      }

      .skill-set {
        display: flex;
        gap: 0.5rem;

        p {
          text-align: center;
          min-width: 50px;
          color: white;
          border-radius: 50px;
          background: #402a3e;
          padding: 0 5px;
        }
        .entry {
          background: lightgreen;
        }
        .junior {
          background: lightblue;
        }
      }
    }
  }
  .bottom-part {
    margin: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .like-display {
      display: flex;
      align-items: center;
    }
    .view-profile-btn {
      cursor: pointer;
      text-decoration: none;
      color: black;
      opacity: 0.7;
    }
  }
`;

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
