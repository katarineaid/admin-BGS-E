import createReducer from '../createReducer';

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

const initialState = {
  status: '',
  selectedWorkspaceData: undefined,
  selectedWorkspaceName: undefined,
  workspaces: [],
};
export default createReducer(initialState, {
  [ADD_WORKSPACE_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Началось создание рабочей области',
  }),
  [ADD_WORKSPACE_SUCCESS]: (state, playload) => Object.assign({}, state, {
    selectedWorkspaceData: playload,
    selectedWorkspaceName: payload.name,
    status: 'Рабочая область создана'
  }),
  [ADD_WORKSPACE_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
  [DELETE_WORKSPACES_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Началось удаление рабочего пространства',
  }),
  [DELETE_WORKSPACES_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
  [DELETE_WORKSPACES_SUCCESS]: (state, payload) => Object.assign({}, state, {
    status: 'Рабочее пространство удалено',
    selectedWorkspaceData: undefined,
    selectedWorkspaceName: undefined,
  }),
  [GET_WORKSPACE_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Запрос на данные рабочего пространства',
  }),
  [GET_WORKSPACE_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
  [GET_WORKSPACE_SUCCESS]: (state, payload) => Object.assign({}, state, {
    status: 'Данные о рабочем пространстве получены',
    selectedWorkspaceData: payload,
    selectedWorkspaceName: payload.name,
  }),
  [UPDATE_WORKSPACE_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Запрос на обновление данных рабочего пространства',
  }),
  [UPDATE_WORKSPACE_SUCCESS]: (state, payload) => Object.assign({}, state, {
    status: 'Данные о рабочем пространстве обновлены',
    selectedWorkspaceData: payload,
    selectedWorkspaceName: payload.name,
  }),
  [UPDATE_WORKSPACE_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
  [GET_LIST_WORKSPACES_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Запрос на список рабочих пространств',
  }),
  [GET_LIST_WORKSPACES_SUCCESS]: (state, payload) => Object.assign({}, state, {
    status: 'Данные о рабочих пространствах получены',
    workspaces: payload,
  }),
  [GET_LIST_WORKSPACES_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
})