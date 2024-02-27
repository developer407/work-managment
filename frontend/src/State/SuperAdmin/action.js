// actions.js
import { api } from '../../config/api';
import * as types from './actionTypes';

// Action creators for getting all admins
export const getAllAdmins = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_ADMINS_REQUEST });
  try {
    const response = await api.get('/api/super-admin/admins', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.GET_ALL_ADMINS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_ADMINS_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for creating an admin
export const createAdminAction = ({jwt, adminData}) => async (dispatch) => {
  dispatch({ type: types.CREATE_ADMIN_REQUEST });
  console.log(jwt,adminData)
  try {
    const response = await api.post('/api/super-admin/create-admin', adminData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.CREATE_ADMIN_SUCCESS,
      payload: response.data,
    });
    // console.log("")
  } catch (error) {
    console.log("error ",error)
    dispatch({
      type: types.CREATE_ADMIN_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for deleting an admin
export const deleteAdmin = ({userId,jwt}) => async (dispatch) => {
  dispatch({ type: types.DELETE_ADMIN_REQUEST });
  try {
    const response = await api.delete(`/api/super-admin/delete/${userId}`,{
        headers:{
            Authorization:`Bearer ${jwt}`
        }
    });
    dispatch({
      type: types.DELETE_ADMIN_SUCCESS,
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_ADMIN_FAILURE,
      payload: error.message,
    });
  }
};
