import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_LIKES,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: true,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        profile: { ...state.profile, likes: payload.likes },
        loading: false,
      };
    default:
      return state;
  }
}
