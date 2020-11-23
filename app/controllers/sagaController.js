//To make the actions and response codes to be centralised, full control of the flow
//We will aim to cover/handle all possible error either propagating error to the user or recovering from anticipated error.
//This acts as our centralise error handling mechanism which enables easily migrate our error handling to a centralise SDK.

import { all, put, fork } from 'redux-saga/effects';
import * as loginActions from '../screens/login/redux/actions';
import * as rootActions from '../system/actions';
import { updateAuthHeader } from '../api/RemoteData';
import { Alert } from 'react-native';
import * as ActionTypes from '../system/types';
import * as productActions from '../screens/home/redux/actions';
import * as types from '../system/types';

const StatusCode = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  INVALID_CREDENTIALS: 400,
  BAD_REQUEST: 404,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  TOO_MANY_REQUESTS: 429,
  NO_RESPONSE: 444,
  INTERNAL_SERVER_ERROR: 500,
});

let statusCode = null;

export function* controlledStates(
  response,
  responseType,
  code,
  showLogs = true,
) {
  statusCode = code;
  showLogs && displayLogs(response, responseType);

  switch (responseType) {
    case types.LOGIN_REQUEST:
      return yield onLoginRequest(response);
    case types.LOGOUT_REQUEST:
      return yield onLogoutRequest(response);
    case types.PRODUCT_LIST_REQUEST:
      return yield onProductRequest(response);
    default:
      return;
  }
  /*actionType = type;
  if (isEmpty(response?.status) || response === undefined) {
  } else {
    if (response?.status !== undefined || !isEmpty(response?.status)) {
      return yield serverStates(response, type);
    } else {
      return yield failStates(response, error);
    }
  }*/
}

function displayLogs(response, type) {
  const liner = '\n____________________________\n';
  const data = 'Response: ' + JSON.stringify(response) + '\nCode:' + statusCode;
  console.log(liner + type + '\n' + data + liner);
}

function* onLoginRequest(response) {
  //Set the store values for login
  let message = '';
  let isLoggedIn = false;
  switch (statusCode) {
    case StatusCode.SUCCESS:
      message = 'Personalizing...';
      isLoggedIn = true;
      break;
    case StatusCode.INVALID_CREDENTIALS:
      message = 'Sorry, Wrong user credentials';
      break;
    default:
      message = 'Please try again';
      break;
  }
  return yield all([
    fork(updateAuthHeader, response.data?.data?.jwt),

    put(loginActions.onLoginResponse(response, message, isLoggedIn)),
    put(rootActions.hideLoader()),
    put(productActions.requestProductList()),
  ]);
}

function* onProductRequest(response) {
  return yield all([put(productActions.onProductListResponse(response.data))]);
}

function* onLogoutRequest() {
  return yield all([put(loginActions.onLogoutResponse())]);
}
