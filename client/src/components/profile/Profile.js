import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import styled from "styled-components";
import { getProfileById } from "../../actions/profile";
import { addLike, removeLike } from "../../actions/profile";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Profile = ({
  addLike,
  removeLike,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  const { id } = useParams();

  // const checkLiked = () => {
  //   return profile.likes.filter((like) => like.user === auth._id).lenght > 0;
  // };

  const handleLike = async (userId) => {
    await addLike(userId);
  };

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById]);

  //Get the id of the profile to add like/unlike
  return (
    <>
      {profile === null || loading ? (
        <Wrapper>
          <Spinner />
        </Wrapper>
      ) : (
        <Wrapper>
          <div className="card">
            <div className="actions">
              <button className="cta-contact">Contact</button>
              {profile.likes.filter((like) => like.user === auth.user._id)
                .length > 0 ? (
                <AiFillHeart
                  color="#a40b0f"
                  className="cta-like"
                  onClick={() => handleLike(profile._id)}
                />
              ) : (
                <AiOutlineHeart
                  className="cta-like"
                  onClick={() => handleLike(profile._id)}
                />
              )}

              {profile.likes.length}
            </div>
            <div className="user-info">
              <img src={profile.user.avatar} alt="" />
              <div>
                <h2>{profile.user.name}</h2>
                <h3>{profile.status}</h3>
              </div>
            </div>
            <div className="user-bio">{profile.bio}</div>
            <div className="user-skills">
              {profile.skills.map((skill, index) => (
                <p key={index}>{skill}</p>
              ))}
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

// <div className="nav-btns">
//   <Link to="/profiles">Back to Profiles</Link>
//   {auth.isAuthenticated &&
//     auth.loading === false &&
//     auth.user._id === profile.user._id && (
//       <Link to="/dashboard/edit-profile">Edit Profile</Link>
//     )}
// </div>;

const Wrapper = styled.section`
  background: #e2fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;

  .card {
    min-width: 450px;
    height: 60%;
    background: #ffff;
    box-shadow: 0 0 1px 0px;
    border-radius: 5px;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;

      .cta-like{
        cursor:pointer;
        background:none;
        border:none;
        

      }
    }
    .user-info {
      display: flex;
      gap: 1rem;
      align-items: center;

      img {
        border-radius: 100%;
        width: 20%;
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2 {
          margin: 0px;
          font-weight: normal;
        }
        h3 {
          margin: 0px;
          font-weight: normal;
        }
      }
    }

    .user-bio {
      margin-top: 3rem;
      height: 300px;
    }

    .user-skills {
      display: flex;
      gap: 0.5rem;
      justify-content: center;

      p {
        background: lightgreen;
        border-radius: 1rem;
        padding:0 5px; 3px;
        min-width:30px;
        text-align: center;
      }
    }
  }
`;

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  getProfileById,
})(Profile);
