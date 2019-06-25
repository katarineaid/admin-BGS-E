import createReducer from '../createReducer';

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

const initialState = {
  status: '',
  userResources: undefined,
  userPlugins: undefined,
};
export default createReducer(initialState, {
  [GET_RESOURCES_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Запрос на структуру ресурсов',
  }),
  [GET_RESOURCES_SUCCESS]: (state, payload) => Object.assign({}, state, {
    userResources: payload,
    status: 'Структура ресурсов получена'
  }),
  [GET_RESOURCES_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
  [GET_PLUGINS_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Запрос на плагины',
  }),
  [GET_PLUGINS_SUCCESS]: (state, payload) => Object.assign({}, state, {
    userPlugins: payload,
    status: 'Плагины получены'
  }),
  [GET_PLUGINS_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
  [UPDATE_PLUGINS_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Запрос на обновление плагинов',
  }),
  [UPDATE_PLUGINS_SUCCESS]: (state, payload) => Object.assign({}, state, {
    userPlugins: payload,
    status: 'Плагины обновлены'
  }),
  [UPDATE_PLUGINS_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
})