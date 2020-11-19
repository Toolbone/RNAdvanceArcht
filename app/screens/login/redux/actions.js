/*
 * Action creators are functions that create and return actions .
 */
import * as types from '../../../system/types';

export function requestLogin(username, password) {
  return {
    type: types.LOGIN_REQUEST,
    token: '',
    message: '',
    username,
    password,
    isRequesting: true,
  };
}

export function onLoginResponse(response, message) {
  return {
    type: types.LOGIN_RESPONSE,
    token: response.data?.data?.jwt,
    message: message,
    username: '',
    password: '',
    isRequesting: false,
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
