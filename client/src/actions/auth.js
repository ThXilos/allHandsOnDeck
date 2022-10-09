import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
//Load User

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = await axios.get("/api/auth/user");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Register

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("api/users", body, config);
      //res.data is the Token
      dispatch({ type: REGISTER_SUCESS, payload: res.data });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({ type: REGISTER_FAIL });
    }
  };
