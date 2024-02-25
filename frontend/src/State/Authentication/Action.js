import {
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { API_URL, api } from "../../config/api";
import axios from "axios";

export const registerUser = (reqData) => async (dispatch) => {
  console.log("resgister request data ", reqData.userData);
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post(
      `${API_URL}/auth/signup`,
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);

    reqData.navigate("/");

    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("catch error ------ ", error);
    dispatch({
      type: REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.data);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);

    reqData.navigate("/");

    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await api.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;

      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const getEmployees = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_EMPLOYEE_REQUEST });
    try {
      const response = await api.get(`/api/admin/employees`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const users = response.data;

      dispatch({ type: GET_EMPLOYEE_SUCCESS, payload: users });
      console.log("employee list ", users);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_EMPLOYEE_FAILURE, payload: errorMessage });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};
