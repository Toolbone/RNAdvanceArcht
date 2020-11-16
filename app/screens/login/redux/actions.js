/*
 * Action creators are functions that create and return actions .
 */
import * as types from '../../../system/types';

export function requestLogin(username, password) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    token: response.data.jwt,
    response,
  };
}

export function requestLogout(token) {
  return {
    type: types.LOGOUT_REQUEST,
    token: token,
  };
}

export function onLogoutResponse() {
  return {
    type: types.LOGOUT_RESPONSE,
  };
}

export function loginFailed(code, message) {
  return {
    type: types.LOGIN_FAILED,
    code: code,
    message: message,
  };
}

export function onLoginRetry() {
  return {
    type: types.LOGIN_RETRY,
    message: '',
  };
}
