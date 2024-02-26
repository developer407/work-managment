
import { api } from "../../config/api";
import * as types from "./actionTypes";

// Action creators for creating an event
export const createEvent =
  ({ eventData, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.CREATE_EVENT_REQUEST });
    try {
      const response = await api.post("/api/admin/events", eventData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.CREATE_EVENT_SUCCESS,
        payload: response.data,
      });
      console.log("event created", response.data);
    } catch (error) {
      dispatch({
        type: types.CREATE_EVENT_FAILURE,
        payload: error.message,
      });
    }
  };

// Action creators for getting an event by ID
export const getEventById =
  ({ id, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_EVENT_REQUEST });
    try {
      const response = await api.get(`/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.GET_EVENT_SUCCESS,
        payload: response.data,
      });
      console.log("get evetn by id", response.data);
    } catch (error) {
      dispatch({
        type: types.GET_EVENT_FAILURE,
        payload: error.message,
      });
    }
  };

// Action creators for getting all events
export const getAllEvents =
  ({ city, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_ALL_EVENTS_REQUEST });
    try {
      const response = await api.get("/api/events", {
        params: { city },
        // headers: {
        //   Authorization: `Bearer ${jwt}`,
        // },
      });
      dispatch({
        type: types.GET_ALL_EVENTS_SUCCESS,
        payload: response.data,
      });
      console.log("get all event", response.data);
    } catch (error) {
      dispatch({
        type: types.GET_ALL_EVENTS_FAILURE,
        payload: error.message,
      });
    }
  };

// Action creators for getting events by company ID
export const getEventsByCompanyId = ({id, city,jwt}) => async (dispatch) => {
  dispatch({ type: types.GET_EVENTS_BY_COMPANY_ID_REQUEST });
  try {
    const response = await api.get(`/api/events/company/${id}`, {
      params: { city },
    //   headers:{
    //     Authorization:`Bearer ${jwt}`
    // }
    });
    dispatch({
      type: types.GET_EVENTS_BY_COMPANY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_EVENTS_BY_COMPANY_ID_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for updating an event
export const updateEvent = ({id, eventData,jwt}) => async (dispatch) => {
  dispatch({ type: types.UPDATE_EVENT_REQUEST });
  try {
    const response = await api.put(`/api/admin/events/${id}`, eventData,{
        headers:{
            Authorization:`Bearer ${jwt}`
        }
    });
    dispatch({
      type: types.UPDATE_EVENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_EVENT_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for deleting an event
export const deleteEvent = ({id,jwt}) => async (dispatch) => {
  dispatch({ type: types.DELETE_EVENT_REQUEST });
  try {
    await api.delete(`/api/admin/events/${id}`,{
        headers:{
            Authorization:`Bearer ${jwt}`
        }
    });
    dispatch({
      type: types.DELETE_EVENT_SUCCESS,
      payload: id,
    });
    console.log("deleted success")
  } catch (error) {
    dispatch({
      type: types.DELETE_EVENT_FAILURE,
      payload: error.message,
    });
  }
};
