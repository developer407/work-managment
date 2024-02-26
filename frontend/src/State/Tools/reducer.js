// reducer.js
import * as types from './actionTypes';

const initialState = {
  tools: [],
  tool: null,
  loading: false,
  error: null,
};

const toolReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TOOL_REQUEST:
    case types.GET_TOOL_REQUEST:
    case types.GET_ALL_TOOLS_REQUEST:
    case types.UPDATE_TOOL_REQUEST:
    case types.DELETE_TOOL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_TOOL_SUCCESS:
        return {
            ...state,
            loading: false,
            tools: [...state.tools,action.payload]
          };
    case types.GET_TOOL_SUCCESS:
    case types.UPDATE_TOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        tool: action.payload,
      };
    case types.GET_ALL_TOOLS_SUCCESS:
      return {
        ...state,
        loading: false,
        tools: action.payload,
      };
    case types.DELETE_TOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        tools: state.tools.filter((tool) => tool.id !== action.payload),
      };
    case types.CREATE_TOOL_FAILURE:
    case types.GET_TOOL_FAILURE:
    case types.GET_ALL_TOOLS_FAILURE:
    case types.UPDATE_TOOL_FAILURE:
    case types.DELETE_TOOL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default toolReducer;
