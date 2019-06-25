import api from '../../api';

import {
  ADD_SOURCE_REQUEST,
  ADD_SOURCE_SUCCESS,
  ADD_SOURCE_FAILURE,
  UPDATE_SOURCE_REQUEST,
  UPDATE_SOURCE_SUCCESS,
  UPDATE_SOURCE_FAILURE,
  DELETE_SOURCES_REQUEST,
  DELETE_SOURCES_SUCCESS,
  DELETE_SOURCES_FAILURE,
  GET_SOURCE_REQUEST,
  GET_SOURCE_SUCCESS,
  GET_SOURCE_FAILURE,
} from './sourceConstants';

function addSourceSuccess(data) {
  return {
    type: ADD_SOURCE_SUCCESS,
    payload: data,
  };
}

function addSourceFailure(data) {
  return {
    type: ADD_SOURCE_FAILURE,
    payload: data,
  };
}

function addSourceRequest() {
  return {
    type: ADD_SOURCE_REQUEST,
  };
}

function addSource(userId, workspaceName) {
  addSourceRequest();
  return dispatch => (api.source.addSource(userId, workspaceName).then((response) => {
    const responseData = response.data;
    if (responseData.status) {
      const sourceData = responseData.data;
      dispatch(addSourceSuccess(sourceData));
      return sourceData;
    }
    dispatch(addSourceFailure(responseData.statusText));
    return {};
  }).catch(error => dispatch(addSourceFailure(error))));
}

function deleteSourceSuccess(data) {
  return {
    type: DELETE_SOURCES_SUCCESS,
    payload: data,
  };
}

function deleteSourceFailure(data) {
  return {
    type: DELETE_SOURCES_FAILURE,
    payload: data,
  };
}

function deleteSourceRequest() {
  return {
    type: DELETE_SOURCES_REQUEST,
  };
}

function deleteSources(userId, sources, workspaceName) {
  deleteSourceRequest();
  return dispatch => (api.source.deleteSources({ userId, sources, workspaceName })
  .then((response) => {
    const responseData = response.data;

    if (responseData.status) {
      dispatch(deleteSourceSuccess('Источники удалены'));
    } else {
      dispatch(deleteSourceFailure(responseData.statusText));
    }
  })
  .catch(error => dispatch(deleteSourceFailure(error))));
}

function updateSourceSuccess(data) {
  return {
    type: UPDATE_SOURCE_SUCCESS,
    payload: data,
  };
}

function updateSourceFailure(data) {
  return {
    type: UPDATE_SOURCE_FAILURE,
    payload: data,
  };
}

function updateSourceRequest() {
  return {
    type: UPDATE_SOURCE_REQUEST,
  };
}

function updateSource(userId, updatedSource, workspaceName) {
  updateSourceRequest();
  return dispatch => (api.source.updateSource({ userId, updatedSource, workspaceName })
  .then((response) => {
    const responseData = response.data;
    if (responseData.status) {
      const currentSourceData = responseData.data;
      dispatch(updateSourceSuccess(currentSourceData));
    } else {
      dispatch(updateSourceFailure(responseData.statusText));
    }
  })
  .catch(error => dispatch(updateSourceFailure(error))));
}


function getSourceSuccess(data) {
  return {
    type: GET_SOURCE_SUCCESS,
    payload: data,
  };
}

function getSourceRequest() {
  return {
    type: GET_SOURCE_REQUEST,
  };
}

function getSourceFailure(data) {
  return {
    type: GET_SOURCE_FAILURE,
    payload: data,
  };
}

function getSource(userId, sourceName) {
  return (dispatch) => {
    dispatch(getSourceRequest());
    return api.source.getSource({ userId, sourceName }).then((response) => {
      const responseData = response.data;
      if (responseData.status) {
        const sourceData = responseData.data;
        dispatch(getSourceSuccess(sourceData));
        return sourceData;
      }
      dispatch(getSourceFailure(responseData.statusText));
      return undefined;
    }).catch(error => dispatch(getSourceFailure(error)));
  };
}

export default {
  addSource,
  deleteSources,
  updateSource,
  getSource,
}