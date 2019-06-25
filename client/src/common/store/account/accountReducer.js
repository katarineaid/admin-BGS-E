import createReducer from '../createReducer';

import configMethods from '../../../../../config';
const config = configMethods.getConfig(process.env.NODE_ENV);

import {
  IS_AUTH_SUCCESS,
  IS_AUTH_FAILURE,
  IS_AUTH_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  REFRESH_ACCOUNT_STATE,
} from './accountConstants';

const initialState = {

  isAuthenticated: false,
  userName: '',
  userId: undefined,
  role: 'viewer',
  accessToken: undefined,
  statusText: '',
  status: '',
  isSignUpSuccess:true,
  singInMessage:'',

  configApp: config,
};


export default createReducer(initialState, {
  [REFRESH_ACCOUNT_STATE]: state => Object.assign({}, state, initialState),
  [IS_AUTH_REQUEST]: (state, payload) => Object.assign({}, state, {
    isAuthenticated: false,
    statusText: 'идет авторизация',
    userName: 'Не известен',
    userId: undefined,
  }),
  [IS_AUTH_SUCCESS]: (state, payload) => Object.assign({}, state, {
    isAuthenticated: payload.isAuthenticated,
    userName: payload.userName,
    userId: payload.userId,
    role: payload.role,
    accessToken: payload.accessToken,
  }),
  [IS_AUTH_FAILURE]: (state, payload) => Object.assign({}, state, {
    isAuthenticated: false,
    statusText: payload,
  }),
  [LOGOUT_REQUEST]: (state, payload) => Object.assign({}, state, {
    statusText: 'Осуществляется выход из сеанса',
  }),
  [LOGOUT_FAILURE]: (state, payload) => {
    console.log(`message: ${payload.statusText}`);
    return Object.assign({}, state, {
      statusText: payload.statusText,
    });
  },
  [LOGOUT_SUCCESS]: (state, payload) => Object.assign({}, state, {
    userName: 'Не известен',
    isAuthenticated: false,
    role: 'viewer',
    statusText: payload.statusText,
    userId: undefined,
    accessToken: undefined,
  }),
  [SIGN_IN_REQUEST]: (state, payload) => Object.assign({}, state, {
    isAuthenticated: false,
    role: 'viewer',
    statusText: 'идет авторизация',
    userName: 'Не известен',
    accountId: undefined,
    accessToken: undefined,
  }),
  [SIGN_IN_SUCCESS]: (state, payload) => Object.assign({}, state, {
    isAuthenticated: payload.isAuthenticated,
    role: payload.role,
    userId: payload.GUID,
    statusText: payload.statusText,
    userName: payload.userName,
    accessToken: payload.accessToken,
    singInMessage: '',
    isSingInError: false,
  }),
  [SIGN_IN_FAILURE]: (state, payload) => Object.assign({}, state, {
    isAuthenticated: false,
    role: 'viewer',
    singInMessage: payload,
    isSingInError: true,
  }),
});

