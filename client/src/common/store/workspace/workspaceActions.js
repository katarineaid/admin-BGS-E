import api from '../../api';

import {
  ADD_WORKSPACE_REQUEST,
  ADD_WORKSPACE_SUCCESS,
  ADD_WORKSPACE_FAILURE,
  UPDATE_WORKSPACE_REQUEST,
  UPDATE_WORKSPACE_SUCCESS,
  UPDATE_WORKSPACE_FAILURE,
  DELETE_WORKSPACES_REQUEST,
  DELETE_WORKSPACES_SUCCESS,
  DELETE_WORKSPACES_FAILURE,
  GET_WORKSPACE_REQUEST,
  GET_WORKSPACE_SUCCESS,
  GET_WORKSPACE_FAILURE,
  GET_LIST_WORKSPACES_REQUEST,
  GET_LIST_WORKSPACES_SUCCESS,
  GET_LIST_WORKSPACES_FAILURE,
} from './workspaceConstants';


function addWorkspaceSuccess(data) {
  return {
    type: ADD_WORKSPACE_SUCCESS,
    payload: data,
  };
}

function addWorkspaceFailure(data) {
  return {
    type: ADD_WORKSPACE_FAILURE,
    payload: data,
  };
}

function addWorkspaceRequest() {
  return {
    type: ADD_WORKSPACE_REQUEST,
  };
}

function addWorkspace(userId) {
  addWorkspaceRequest();
  return dispatch => (api.workspace.addWorkspace(userId).then((response) => {
    const responseData = response.data;
    if (responseData.status) {
      const workspaceData = responseData.data;
      dispatch(addWorkspaceSuccess(workspaceData));
      return workspaceData;
    }
    dispatch(addWorkspaceFailure(responseData.statusText));
    return {};
  }).catch(error => dispatch(addWorkspaceFailure(error))));
}

function deleteWorkspaceSuccess(data) {
  return {
    type: DELETE_WORKSPACES_SUCCESS,
    payload: data,
  };
}

function deleteWorkspaceFailure(data) {
  return {
    type: DELETE_WORKSPACES_FAILURE,
    payload: data,
  };
}

function deleteWorkspaceRequest() {
  return {
    type: DELETE_WORKSPACES_REQUEST,
  };
}

function deleteWorkspaces(userId, workspaces) {
  deleteWorkspaceRequest();
  return dispatch => (api.workspace.deleteWorkspaces({ userId, workspaces }).then((response) => {
    const responseData = response.data;

    if (responseData.status) {
      dispatch(deleteWorkspaceSuccess('Рабочие пространства удалены удалена'));
    } else {
      dispatch(deleteWorkspaceFailure(responseData.statusText));
    }
  }).catch(error => dispatch(deleteWorkspaceFailure(error))));
}

function updateWorkspaceSuccess(data) {
  return {
    type: UPDATE_WORKSPACE_SUCCESS,
    payload: data,
  };
}

function updateWorkspaceFailure(data) {
  return {
    type: UPDATE_WORKSPACE_FAILURE,
    payload: data,
  };
}

function updateWorkspaceRequest() {
  return {
    type: UPDATE_WORKSPACE_REQUEST,
  };
}

function updateWorkspace(userId, updatedWorkspace) {
  updateWorkspaceRequest();
  return dispatch => (api.workspace.updateWorkspace(userId, updatedWorkspace).then((response) => {
    const responseData = response.data;
    if (responseData.status) {
      const currentWorkspaceData = responseData.data;
      dispatch(updateWorkspaceSuccess(currentWorkspaceData));
    } else {
      dispatch(updateWorkspaceFailure(responseData.statusText));
    }
  }).catch(error => dispatch(updateWorkspaceFailure(error))));
}


function getWorkspaceSuccess(data) {
  return {
    type: GET_WORKSPACE_SUCCESS,
    payload: data,
  };
}

function getWorkspaceRequest() {
  return {
    type: GET_WORKSPACE_REQUEST,
  };
}

function getWorkspaceFailure(data) {
  return {
    type: GET_WORKSPACE_FAILURE,
    payload: data,
  };
}

function getWorkspace(userId, workspaceName) {
  return (dispatch) => {
    dispatch(getWorkspaceRequest());
    return api.workspace.getWorkspace(userId, workspaceName).then((response) => {
      const responseData = response.data;
      if (responseData.status) {
        const workspaceData = responseData.data;
        dispatch(getWorkspaceSuccess(workspaceData));
        return workspaceData;
      }
      dispatch(getWorkspaceFailure(responseData.statusText));
      return undefined;
    }).catch(error => dispatch(getWorkspaceFailure(error)));
  };
}


function getListWorkspacesSuccess(data) {
  return {
    type: GET_LIST_WORKSPACES_SUCCESS,
    payload: data,
  };
}

function getListWorkspacesRequest() {
  return {
    type: GET_LIST_WORKSPACES_REQUEST,
  };
}

function getListWorkspacesFailure(data) {
  return {
    type: GET_LIST_WORKSPACES_FAILURE,
    payload: data,
  };
}

function getWorkspacesList(userId) {
  return (dispatch) => {
    dispatch(getListWorkspacesRequest());
    return api.workspace.getWorkspaces({userId}).then((response) => {
      const responseData = response.data;
      if (responseData.status) {
        const listWorkspacesData = responseData.data;
        dispatch(getListWorkspacesSuccess(listWorkspacesData));
        return listWorkspacesData;
      }
      dispatch(getListWorkspacesFailure(responseData.statusText));
      return undefined;
    }).catch(error => dispatch(getWorkspaceFailure(error)));
  };
}

export default {
  addWorkspace,
  deleteWorkspaces,
  updateWorkspace,
  getWorkspace,
  getWorkspacesList
}