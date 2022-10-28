import { ErrorResponse } from "@remix-run/router";
import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CLEAR_PROFILE,
  UPDATE_LIKES,
} from "./types";

//Get current users profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    //there is no profile data for this user....lecture 46 will address this issue
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get all profiles

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");
    //there is no profile data for this user....lecture 46 will address this issue
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get profile by ID.

export const getProfileById = (userID) => async (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(`/api/profile/user/${userID}`);
    //there is no profile data for this user....lecture 46 will address this issue
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update profile

export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      navigate("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

//Add Like
export const addLike = (profileId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/like/${profileId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { profileId, likes: res.data },
    });
  } catch (error) {
    if (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.data.msg,
          status: error.response.status,
        },
      });
    }
  }
};

// //Remove Like
// export const removeLike = (profileId) => async (dispatch) => {
//   try {
//     const res = await axios.put(`/api/profile/unlike/${profileId}`);
//     dispatch({
//       type: UPDATE_LIKES,
//       payload: { profileId, likes: res.data },
//     });
//   } catch (error) {
//     if (error) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: {
//           msg: error.response.data.msg,
//           status: error.response.status,
//         },
//       });
//     }
//   }
// };
