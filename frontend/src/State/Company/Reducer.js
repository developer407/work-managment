// reducer.js
import * as types from "./actionTypes";

const initialState = {
  companies: [],
  company: null,
  loading: false,
  error: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_COMPANY_REQUEST:
    case types.GET_COMPANY_REQUEST:
    case types.GET_ALL_COMPANIES_REQUEST:
    case types.UPDATE_COMPANY_REQUEST:
    case types.DELETE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
        companies: [...state.companies, action.payload],
      };
    case types.GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
      };
    case types.GET_ALL_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: action.payload,
      };
    case types.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: state.companies.map((item) =>
          action.payload.id == item.id ? action.payload : item
        ),
      };
    case types.DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: state.companies.filter(
          (company) => company.id !== action.payload
        ),
      };
    case types.CREATE_COMPANY_FAILURE:
    case types.GET_COMPANY_FAILURE:
    case types.GET_ALL_COMPANIES_FAILURE:
    case types.UPDATE_COMPANY_FAILURE:
    case types.DELETE_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default companyReducer;
