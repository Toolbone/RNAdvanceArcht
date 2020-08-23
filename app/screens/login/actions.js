/*
 * Reducer actions related with login
 */
import * as types from './types';

export function requestLogin(email, password) {
  return {
    type: types.LOGIN_REQUEST,
    email,
    password,
  };
}

export function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

export function onLoginResponse(response) {
  console.log('*************************');
  console.log(JSON.stringify(response));
  return {
    type: types.LOGIN_RESPONSE,
    token: response.token,
    response,
  };
}

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}
