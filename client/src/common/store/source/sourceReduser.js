import createReducer from '../createReducer';

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

const initialState = {
  status: '',
  selectedSourceData: undefined,
  selectedSourceName: undefined,
  sources: [],
};

export default createReducer(initialState, {
  [ADD_SOURCE_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Началось создание источники',
  }),
  [ADD_SOURCE_SUCCESS]: (state, playload) => Object.assign({}, state, {
    selectedSourceData: playload,
    selectedSourceName: payload.name,
    status: 'Источник создан'
  }),
  [ADD_SOURCE_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
  [DELETE_SOURCES_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Началось удаление источников',
  }),
  [DELETE_SOURCES_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
  [DELETE_SOURCES_SUCCESS]: (state, payload) => Object.assign({}, state, {
    status: 'Источники удалено',
    selectedSourceData: undefined,
    selectedSourceName: undefined,
  }),

  [GET_SOURCE_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Запрос на данные об источнике',
  }),
  [GET_SOURCE_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  }),
  [GET_SOURCE_SUCCESS]: (state, payload) => Object.assign({}, state, {
    status: 'Данные об источнике получены',
    selectedSourceData: payload,
    selectedSourceName: payload.name,
  }),
  [UPDATE_SOURCE_REQUEST]: (state, payload) => Object.assign({}, state, {
    status: 'Запрос на обновление данных источника',
  }),
  [UPDATE_SOURCE_SUCCESS]: (state, payload) => Object.assign({}, state, {
    status: 'Данные об источнике обновлены',
    selectedSourceData: payload,
    selectedSourceName: payload.name,
  }),
  [UPDATE_SOURCE_FAILURE]: (state, payload) => Object.assign({}, state, {
    status: payload,
  })
})