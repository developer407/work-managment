import { isPresentInFavorites } from "../../config/logic";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  GET_EMPLOYEE_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  success: null,
  employees: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Register Success",
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Login success",
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employees: action.payload,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, 
        isLoading: false, 
        error: action.payload };

    case LOGOUT:
      localStorage.removeItem("jwt");
      return { ...state, jwt: null, user: null, success: "logout success" };
    default:
      return state;
  }
};

export default authReducer;
