import { api } from "../../config/api";
import * as types from "./actionTypes";

// Action creators for creating files
export const createFiles =
  ({ fileData, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.CREATE_FILES_REQUEST });
    try {
      const response = await api.post("/api/admin/files", fileData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.CREATE_FILES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: types.CREATE_FILES_FAILURE,
        payload: error.message,
      });
    }
  };

// Action creators for getting files by ID
export const getFilesById =
  ({ id, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_FILES_REQUEST });
    try {
      const response = await api.get(`/api/files/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.GET_FILES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: types.GET_FILES_FAILURE,
        payload: error.message,
      });
    }
  };

// Action creators for getting all files
export const getAllFiles =
  ({ type, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_ALL_FILES_REQUEST });
    try {
      const response = await api.get("/api/files", {
        params: { type },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.GET_ALL_FILES_SUCCESS,
        payload: response.data,
      });
      console.log("files ",response.data)
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: types.GET_ALL_FILES_FAILURE,
        payload: error.message,
      });
    }
  };

// Action creators for updating files
export const updateFiles =
  ({ id, filesData, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.UPDATE_FILES_REQUEST });
    try {
      const response = await api.put(`/api/admin/files/${id}`, filesData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.UPDATE_FILES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: types.UPDATE_FILES_FAILURE,
        payload: error.message,
      });
    }
  };

// Action creators for deleting files
export const deleteFiles =
  ({ id, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.DELETE_FILES_REQUEST });
    try {
      await api.delete(`/api/admin/files/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.DELETE_FILES_SUCCESS,
        payload: id,
      });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: types.DELETE_FILES_FAILURE,
        payload: error.message,
      });
    }
  };

// Action creators for finding files by company ID
export const findFilesByCompanyId =
  ({ companyId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.FIND_FILES_BY_COMPANY_ID_REQUEST });
    try {
      const response = await api.get(`/api/files/company/${companyId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.FIND_FILES_BY_COMPANY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: types.FIND_FILES_BY_COMPANY_ID_FAILURE,
        payload: error.message,
      });
    }
  };
