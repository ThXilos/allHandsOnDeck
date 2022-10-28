import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "../../components/profiles/ProfileItem";

import styled from "styled-components";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <>
      <Wrapper>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1>Pickaroons</h1>
            <div className="list">
              {profiles.length > 0 ? (
                profiles.map((profile, index) => (
                  <ProfileItem key={index} profile={profile} />
                ))
              ) : (
                <h4>No profiles found</h4>
              )}
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  background: #e2fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  h1 {
    margin-left: 1rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
