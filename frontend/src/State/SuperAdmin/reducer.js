// reducer.js
import * as types from './actionTypes';

const initialState = {
  admins: [],
  loading: false,
  error: null,
};

const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_ADMINS_REQUEST:
    case types.CREATE_ADMIN_REQUEST:
    case types.DELETE_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ALL_ADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: action.payload,
      };
    case types.CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: [...state.admins, action.payload],
      };
    case types.DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: state.admins.filter((admin) => admin.id !== action.payload),
      };
    case types.GET_ALL_ADMINS_FAILURE:
    case types.CREATE_ADMIN_FAILURE:
    case types.DELETE_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default superAdminReducer;
