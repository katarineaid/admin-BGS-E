import api from '../../api';

import {
  GET_RESOURCES_REQUEST,
  GET_RESOURCES_SUCCESS,
  GET_RESOURCES_FAILURE,
  GET_PLUGINS_REQUEST,
  GET_PLUGINS_SUCCESS,
  GET_PLUGINS_FAILURE,
  UPDATE_PLUGINS_SUCCESS,
  UPDATE_PLUGINS_FAILURE,
  UPDATE_PLUGINS_REQUEST,
} from './resourcesConstants';


function getResourcesSuccess(data) {
  return {
    type: GET_RESOURCES_SUCCESS,
    payload: data,
  };
}

function getResourcesFailure(data) {
  return {
    type: GET_RESOURCES_FAILURE,
    payload: data,
  };
}

function getResourcesRequest() {
  return {
    type: GET_RESOURCES_REQUEST,
  };
}

function getResources(userId) {
  getResourcesRequest();
  return dispatch => (api.resources.get(userId).then((response) => {
    const responseData = response.data;
    if (responseData.status) {
      const resourcesData = responseData.data;
      dispatch(getResourcesSuccess(resourcesData));
      return resourcesData;
    }
    dispatch(getResourcesFailure(responseData.statusText));
    return {};
  }).catch(error => dispatch(getResourcesFailure(error))));
}

function getPluginsSuccess(data) {
  return {
    type: GET_PLUGINS_SUCCESS,
    payload: data,
  };
}

function getPluginsFailure(data) {
  return {
    type: GET_PLUGINS_FAILURE,
    payload: data,
  };
}

function getPluginsRequest() {
  return {
    type: GET_PLUGINS_REQUEST,
  };
}

function getPlugins(userId) {
  getPluginsRequest();
  return dispatch => (api.resources.getPlugins(userId).then((response) => {
    const responseData = response.data;
    if (responseData.status) {
      const resourcesData = responseData.data;
      dispatch(getPluginsSuccess(resourcesData));
      return resourcesData;
    }
    dispatch(getPluginsFailure(responseData.statusText));
    return {};
  }).catch(error => dispatch(getPluginsFailure(error))));
}


function updatePluginsSuccess(data) {
  return {
    type: UPDATE_PLUGINS_SUCCESS,
    payload: data,
  };
}

function updatePluginsFailure(data) {
  return {
    type: UPDATE_PLUGINS_FAILURE,
    payload: data,
  };
}

function updatePluginsRequest() {
  return {
    type: UPDATE_PLUGINS_REQUEST,
  };
}

function updatePlugins(userId, updatedPlugins) {
  updatePluginsRequest();
  return dispatch => (api.resources.updatePlugins(userId, updatedPlugins).then((response) => {
    const responseData = response.data;
    if (responseData.status) {
      const currentPluginsData = responseData.data;
      dispatch(updatePluginsSuccess(currentPluginsData));
    } else {
      dispatch(updatePluginsFailure(responseData.statusText));
    }
  }).catch(error => dispatch(updatePluginsFailure(error))));
}


export default {
  getResources,
  getPlugins,
  updatePlugins,
}