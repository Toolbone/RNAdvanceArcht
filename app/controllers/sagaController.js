//To make the actions and response codes to be centralised, full control of the flow
//We will aim to cover/handle all possible error either propagating error to the user or recovering from anticipated error.
//This acts as our centralise error handling mechanism which enables easily migrate our error handling to a centralise SDK.

import { all, put, fork } from 'redux-saga/effects';
import * as loginActions from '../screens/login/redux/actions';
import * as rootActions from '../system/actions';
import { updateAuthHeader } from '../api/RemoteData';
import { Alert } from 'react-native';
import { isEmpty } from 'ramda';
import * as ActionTypes from '../system/types';
import * as productActions from '../screens/home/redux/actions';

const StatusCode = Object.freeze({
  SUCCESS: '200',
  CREATED: '201',
  ACCEPTED: '202',
  BAD_REQUEST: '400',
  BAD_GATEWAY: '502',
  SERVICE_UNAVAILABLE: '503',
  TOO_MANY_REQUESTS: '429',
  INVALID: '403',
  NO_RESPONSE: '444',
  INTERNAL_SERVER_ERROR: '500',
});

let actionType = ActionTypes.DEFAULT;

export function* controlledStates(response, error, type, showLogs = true) {
  //Backend api rules when success
  if (showLogs) {
    console.log(
      '\n---------\nActionType: ' +
        actionType +
        '\nResponse: ' +
        JSON.stringify(response) +
        '\nError: ' +
        JSON.stringify(error) +
        JSON.stringify(response?.data?.success) +
        JSON.stringify(response?.data?.data?.message) +
        '\n---------',
    );
  }
  actionType = type;
  if (isEmpty(response?.status) || response === undefined) {
  } else {
    if (response?.status !== undefined || !isEmpty(response?.status)) {
      return yield serverStates(response, type);
    } else {
      return yield failStates(response, error);
    }
  }
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
