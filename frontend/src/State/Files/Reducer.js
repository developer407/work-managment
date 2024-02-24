// reducer.js
import * as types from './actionTypes';

const initialState = {
  files: [],
  file: null,
  loading: false,
  error: null,
};

const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FILES_REQUEST:
    case types.GET_FILES_REQUEST:
    case types.GET_ALL_FILES_REQUEST:
    case types.UPDATE_FILES_REQUEST:
    case types.DELETE_FILES_REQUEST:
    case types.FIND_FILES_BY_COMPANY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_FILES_SUCCESS:
    case types.GET_FILES_SUCCESS:
    case types.UPDATE_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        file: action.payload,
      };
    case types.GET_ALL_FILES_SUCCESS:
    case types.FIND_FILES_BY_COMPANY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        files: action.payload,
      };
    case types.DELETE_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        files: state.files.filter((file) => file.id !== action.payload),
      };
    case types.CREATE_FILES_FAILURE:
    case types.GET_FILES_FAILURE:
    case types.GET_ALL_FILES_FAILURE:
    case types.UPDATE_FILES_FAILURE:
    case types.DELETE_FILES_FAILURE:
    case types.FIND_FILES_BY_COMPANY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default filesReducer;
