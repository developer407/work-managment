// actions.js
import { api } from '../../config/api';
import * as types from './actionTypes';

// Action creators for creating a tool
export const createTool = ({toolData,jwt}) => async (dispatch) => {
  dispatch({ type: types.CREATE_TOOL_REQUEST });
  try {
    const response = await api.post('/api/admin', toolData,{
        headers:{
            Authorization:`Bearer ${jwt}`
        }
    });
    dispatch({
      type: types.CREATE_TOOL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_TOOL_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for getting a tool by ID
export const getToolById = (id) => async (dispatch) => {
  dispatch({ type: types.GET_TOOL_REQUEST });
  try {
    const response = await api.get(`/api/${id}`);
    dispatch({
      type: types.GET_TOOL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_TOOL_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for getting all tools
export const getAllTools = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_TOOLS_REQUEST });
  try {
    const response = await api.get('/api');
    dispatch({
      type: types.GET_ALL_TOOLS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_TOOLS_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for updating a tool
export const updateTool = ({id, toolData,jwt}) => async (dispatch) => {
  dispatch({ type: types.UPDATE_TOOL_REQUEST });
  try {
    const response = await api.put(`/api/admin/${id}`, toolData,{
        headers:{
            Authorization:`Bearer ${jwt}`
        }
    });
    dispatch({
      type: types.UPDATE_TOOL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_TOOL_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for deleting a tool
export const deleteTool = ({id,jwt}) => async (dispatch) => {
  dispatch({ type: types.DELETE_TOOL_REQUEST });
  try {
    await api.delete(`/api/admin/${id}`,{
        headers:{
            Authorization:`Bearer ${jwt}`
        }
    });
    dispatch({
      type: types.DELETE_TOOL_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_TOOL_FAILURE,
      payload: error.message,
    });
  }
};
