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

let actionType = ActionTypes.DEFAULT;
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
    case types.LOGOUT_RESPONSE:
      console.log('Login response' + JSON.stringify(response));
      break;
    case types.PRODUCT_LIST_REQUEST:
      console.log('Login response' + JSON.stringify(response));
      break;
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
  switch (statusCode) {
    case StatusCode.SUCCESS:
      message = 'Personalizing...';
      break;
    case StatusCode.INVALID_CREDENTIALS:
      message = 'Sorry, Wrong user credentials';
      break;
    default:
      message = 'Please try again';
      break;
  }
  return yield all([
    put(loginActions.onLoginResponse(response, message)),
    put(rootActions.hideLoader()),
    fork(updateAuthHeader, response.data.jwt),

    put(productActions.requestProductList(10)),
  ]);
}
//*****************************************************
// When server responded with status
//*****************************************************
function* serverStates(response) {
  return yield yieldPositiveCodes(response.status, response.data);
}

function* yieldPositiveCodes(code: StatusCode, response) {
  switch (code.toString()) {
    case StatusCode.SUCCESS:
      return yield onSuccessEffects(response);
    case StatusCode.BAD_REQUEST:
      return yield onBadRequestEffects(response);
    case StatusCode.ACCEPTED:
      break;
    default:
      Alert.alert('STATUS CODE NOT FOUND');
  }
}

function* onSuccessEffects(response) {
  switch (actionType) {
    case ActionTypes.LOGIN_REQUEST:
      return yield all([
        put(loginActions.onLoginResponse(response)),
        put(rootActions.hideLoader()),

        fork(updateAuthHeader, response.data.jwt),
      ]);
    case ActionTypes.LOGOUT_REQUEST:
      return yield all([
        put(loginActions.onLogoutResponse(response)),
        fork(updateAuthHeader, ''),
      ]);
    case ActionTypes.PRODUCT_LIST_REQUEST:
      return yield all([put(productActions.onProductListResponse(response))]);
    default:
      Alert.alert(actionType);
  }
}

function* onBadRequestEffects(response) {
  switch (actionType) {
    case ActionTypes.LOGIN_REQUEST:
      return yield all([
        put(loginActions.loginFailed(actionType, response?.data?.message)),
        put(rootActions.hideLoader()),
      ]);
    case ActionTypes.LOGOUT_REQUEST:
      Alert.alert(actionType);
      break;
    default:
      Alert.alert(actionType);
      break;
  }
}

//*****************************************************
// When server returned error
//*****************************************************
function* failStates(response, error) {
  return yield yieldNegativeCodes(processErrorCode(error), response);
}

function processErrorCode(error) {
  if (error === undefined) {
    return;
  }
  return StatusCode.INVALID;
}

function* yieldNegativeCodes(code: StatusCode, response) {
  switch (code) {
    case StatusCode.INVALID:
      Alert.alert(code, response?.message?.toString());
      break;
    case StatusCode.TOO_MANY_REQUESTS:
      yield put(rootActions.hideLoader());
      break;
    case StatusCode.NO_RESPONSE:
      yield put(rootActions.hideLoader());
      break;
    default:
      Alert.alert('STATUS CODE NOT FOUND');
      break;
  }

  return yield all([put(rootActions.hideLoader())]);
}
