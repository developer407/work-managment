// actions.js
import * as types from './actionTypes';
import { api } from '../../config/api';

// Action creators for creating a company
export const createCompany = ({companyData,jwt}) => async (dispatch) => {
  dispatch({ type: types.CREATE_COMPANY_REQUEST });
  try {
    const response = await api.post('/api/admin/companies', companyData,{
      headers:{
        Authorization:`Bearer ${jwt}`
      }
    });
    dispatch({
      type: types.CREATE_COMPANY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: types.CREATE_COMPANY_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for getting a company by ID
export const getCompanyById = ({id,jwt}) => async (dispatch) => {
  dispatch({ type: types.GET_COMPANY_REQUEST });
  try {
    const response = await api.get(`/api/companies/${id}`,{
      // headers:{
      //   Authorization:`Bearer ${jwt}`
      // }
    });
    console.log("company by id",response.data)
    dispatch({
      type: types.GET_COMPANY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: types.GET_COMPANY_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for getting all companies
export const getAllCompanies = ({jwt,city}) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_COMPANIES_REQUEST });
  try {
    const response = await api.get('/api/companies',{
      params:{city},
      // headers:{
      //   Authorization:`Bearer ${jwt}`
      // }
    });
    console.log("companies ",response.data)
    dispatch({
      type: types.GET_ALL_COMPANIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: types.GET_ALL_COMPANIES_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for updating a company
export const updateCompany = ({id, companyData,jwt}) => async (dispatch) => {
  dispatch({ type: types.UPDATE_COMPANY_REQUEST });
  try {
    const response = await api.put(`/api/admin/companies/${id}`, companyData,
    {
      headers:{
        Authorization:`Bearer ${jwt}`
      }
    });
    dispatch({
      type: types.UPDATE_COMPANY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: types.UPDATE_COMPANY_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for deleting a company
export const deleteCompany = ({id,jwt}) => async (dispatch) => {
  dispatch({ type: types.DELETE_COMPANY_REQUEST });
  try {
    await api.delete(`/api/admin/companies/${id}`,{
      headers:{
        Authorization:`Bearer ${jwt}`
      }
    });
    dispatch({
      type: types.DELETE_COMPANY_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: types.DELETE_COMPANY_FAILURE,
      payload: error.message,
    });
  }
};
