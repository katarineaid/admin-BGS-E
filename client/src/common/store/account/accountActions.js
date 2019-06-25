import api from '../../api';

import {
  REFRESH_ACCOUNT_STATE,
  IS_AUTH_SUCCESS,
  IS_AUTH_FAILURE,
  IS_AUTH_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
} from './accountConstants';


export function refreshAccount() {
  return dispatch =>
    dispatch({ type: REFRESH_ACCOUNT_STATE });
}

function isAuthenticatedSuccess(data) {
  return {
    type: IS_AUTH_SUCCESS,
    payload: data,
  };
}

function isAuthenticatedFailure(data) {
  return {
    type: IS_AUTH_FAILURE,
    payload: data,
  };
}

function isAuthenticatedRequest() {
  return {
    type: IS_AUTH_REQUEST,
  };
}

export function isAuthenticated({ accessToken }) {
  isAuthenticatedRequest();
  return dispatch => (api.account.isAuthenticated({ accessToken }).then((response) => {
    const responseData = response.data;
    const data = responseData.data;
    if (responseData.status) {
      dispatch(isAuthenticatedSuccess(data));
    } else {
      dispatch(isAuthenticatedFailure(responseData.statusText));
    }
  }));
}


export function UserLogoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function UserLogoutFailure(data) {
  return {
    type: LOGOUT_FAILURE,
    payload: data,
  };
}

export function UserLogoutSuccess(data) {
  return {
    type: LOGOUT_SUCCESS,
    payload: data,
  };
}

export function logoutUser(accessToken) {
  return (dispatch) => {
    dispatch(UserLogoutRequest());
    return api.account.signOut(accessToken).then((response) => {
      const data = response.data;
      if (!data.isAuthenticated) {
        dispatch(UserLogoutSuccess(data));
      } else {
        dispatch(UserLogoutFailure(data));
      }
    });
  };
}

function singInSuccess(data) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: data,
  };
}

function singInFailure(data) {
  return {
    type: SIGN_IN_FAILURE,
    payload: data,
  };
}

function singInRequest() {
  return {
    type: SIGN_IN_REQUEST,
  };
}

export function singIn(identification, password) {
  return (dispatch) => {
    dispatch(singInRequest());
    return api.account.signIn(identification, password).then((response) => {
      const responseData = response.data;
      return responseData.status ?
        dispatch(singInSuccess(responseData.data)) :
        dispatch(singInFailure(responseData.statusText));
    });
  };
}

export default {
  refreshAccount,
  isAuthenticated,
  logoutUser,
  singIn
}