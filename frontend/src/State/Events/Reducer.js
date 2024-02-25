// reducer.js
import * as types from './actionTypes';

const initialState = {
  events: [],
  event: null,
  loading: false,
  error: null,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_EVENT_REQUEST:
    case types.GET_EVENT_REQUEST:
    case types.GET_ALL_EVENTS_REQUEST:
    case types.GET_EVENTS_BY_COMPANY_ID_REQUEST:
    case types.UPDATE_EVENT_REQUEST:
    case types.DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_EVENT_SUCCESS:
    case types.GET_EVENT_SUCCESS:
    case types.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.payload,
      };
    case types.GET_ALL_EVENTS_SUCCESS:
    case types.GET_EVENTS_BY_COMPANY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case types.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case types.CREATE_EVENT_FAILURE:
    case types.GET_EVENT_FAILURE:
    case types.GET_ALL_EVENTS_FAILURE:
    case types.GET_EVENTS_BY_COMPANY_ID_FAILURE:
    case types.UPDATE_EVENT_FAILURE:
    case types.DELETE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;
