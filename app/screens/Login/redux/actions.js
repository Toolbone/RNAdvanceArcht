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
    isLoggedIn: false,
  };
}

export function onLoginResponse(response, message, isLoggedIn) {
  return {
    type: types.LOGIN_RESPONSE,
    token: response?.data?.jwt?.token,
    id: response?.data?.user?.data?.ID,
    message: message,
    username: '',
    password: '',
    isRequesting: false,
    isLoggedIn: isLoggedIn,
  };
}

export function requestLogout(message?) {
  return {
    type: types.LOGOUT_REQUEST,
    token: '',
    message: message,
    username: '',
    password: '',
    isRequesting: false,
    isLoggedIn: false,
  };
}

export function onLogoutResponse() {
  return {
    type: types.LOGOUT_RESPONSE,
    token: '',
    message: '',
    username: '',
    password: '',
    isRequesting: false,
    isLoggedIn: false,
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
