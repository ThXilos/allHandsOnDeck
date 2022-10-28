import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  createProfile,
  profile: { profile, loading },
  getCurrentProfile,
}) => {
  const navigate = useNavigate();
  const [toggleSocialInputs, setToggleSocialInputs] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    bio: "",
    skills: "",
    facebook: "",
    instagram: "",
    from: "",
    to: "",
    hasAccomendation: "",
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      status: loading || !profile.status ? "" : profile.status,
      bio: loading || !profile.bio ? "" : profile.bio,
      skills: loading || !profile.skills ? "" : profile.skills,
      facebook: loading || !profile.facebook ? "" : profile.facebook,
      instagram: loading || !profile.instagram ? "" : profile.instagram,
      from:
        loading || !profile.availability?.from ? "" : profile.availability.from,
      to: loading || !profile.availability?.to ? "" : profile.availability?.to,
      hasAccomendation:
        loading || !profile.hasAccomendation ? "" : profile.hasAccomendation,
    });
  }, [loading]);

  const {
    status,
    bio,
    skills,
    facebook,
    instagram,
    from,
    to,
    hasAccomendation,
  } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Wrapper>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="top-part">
          <label className="form-labels" of="status">
            Status:
          </label>
          <select name="status" value={status} onChange={handleChange}>
            <option value="0">*Select status</option>
            <option value="worker">Worker</option>
            <option value="management">Management</option>
          </select>
          <label className="form-labels" of="bio">
            Short Bio:
          </label>
          <input
            id="bio"
            type="text"
            placeholder="Bio"
            name="bio"
            value={bio}
            onChange={handleChange}
          ></input>
          <label className="form-labels" of="from">
            From: {from}
          </label>
          <input
            id="from"
            type="date"
            placeholder="Title"
            name="from"
            value={from}
            onChange={handleChange}
          ></input>
          <label className="form-labels" of="to">
            To: {to}
          </label>
          <input
            id="to"
            type="date"
            placeholder="to"
            name="to"
            value={to}
            onChange={handleChange}
          ></input>
          <label className="form-labels" of="status">
            Skills:
          </label>
          <input
            type="text"
            placeholder="Skills"
            value={skills}
            onChange={handleChange}
            name="skills"
          />
          {/* <select
            id="skills"
            name="skills"
            value={skills}
            onChange={handleChange}
          >
            <option value="0">*add your skills</option>
            <option value="backdesk">Backdesk</option>
            <option value="frontdesk">Frondesk</option>
          </select> */}
          <p onClick={() => setToggleSocialInputs(!toggleSocialInputs)}>
            {toggleSocialInputs ? `Hide social links` : `Show social links`}
          </p>
          {toggleSocialInputs && (
            <div>
              <label className="form-labels" of="status">
                Facebook:
              </label>
              <input
                id="facebook_link"
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={handleChange}
              ></input>
              <label className="form-labels" of="status">
                Instagram:
              </label>
              <input
                id="instagram_link"
                type="text"
                placeholder="Instagram Link"
                name="instagram"
                value={instagram}
                onChange={handleChange}
              ></input>
            </div>
          )}
        </div>
        <p></p>
        <div className="bottom-part">
          <button type="submit">Save</button>
          <Link to="/dashboard">
            <button type="button">Back</button>
          </Link>
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
      cursor:pointer;
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
    gap:1rem;
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
