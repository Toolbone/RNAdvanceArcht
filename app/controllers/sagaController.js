//To make the actions and response codes to be centralised, full control of the flow
//We will aim to cover/handle all possible error either propagating error to the user or recovering from anticipated error.
//This acts as our centralise error handling mechanism which enables easily migrate our error handling to a centralise SDK.

import { all, put, fork } from 'redux-saga/effects';
import * as loginActions from '../screens/login/actions';
import * as projectActions from '../system/actions';
import { updateAuthHeader } from '../api/RemoteData';
import { Alert } from 'react-native';
import { isEmpty } from 'ramda';

const StatusCode = Object.freeze({
  SUCCESS: '200',
  CREATED: '201',
  ACCEPTED: '202',
  BAD_GATEWAY: '502',
  SERVICE_UNAVAILABLE: '503',
  TOO_MANY_REQUESTS: '429',
  INVALID: '403',
  NO_RESPONSE: '444',
  INTERNAL_SERVER_ERROR: '500',
});

export function* controlledStates(response, error) {
  console.log(JSON.stringify(response));
  //Backend api rules when success
  const successRules =
    !isEmpty(response) &&
    (isEmpty(error) || error === undefined) &&
    (isEmpty(response?.code) || response.code === undefined);

  if (successRules) {
    return yield successStates(response);
  } else {
    return yield unSuccessfulStates(response, error);
  }
}

function* successStates(response) {
  return yield yieldPositiveCodes(processResponseCode(response), response);
}

function* unSuccessfulStates(response, error) {
  return yield yieldNegativeCodes(
    processResponseCode(response, error),
    response,
  );
}

function processResponseCode(response) {
  if (response.data !== undefined) {
    return response.data.status === undefined
      ? StatusCode.INTERNAL_SERVER_ERROR
      : response.data.status.toString();
  } else {
    return StatusCode.SUCCESS;
  }
}

function* yieldPositiveCodes(code: StatusCode, response) {
  yield put(projectActions.hideLoader());

  switch (code) {
    case StatusCode.SUCCESS:
      return yield all([
        put(loginActions.onLoginResponse(response)),
        fork(updateAuthHeader, response.token),
      ]);
    case StatusCode.CREATED:
      break;
    case StatusCode.ACCEPTED:
      break;

    default:
      Alert.alert('STATUS CODE NOT FOUND');
  }
}

function* yieldNegativeCodes(code: StatusCode, response) {
  switch (code.toString()) {
    case StatusCode.INVALID:
      //Alert.alert(code, response.message.toString());
      break;
    //return yield all([put(loginActions.loginFailed())]);
    case StatusCode.TOO_MANY_REQUESTS:
      //Alert.alert(code, response.message.toString());

      break;
    case StatusCode.NO_RESPONSE:
     // Alert.alert(code, response.message.toString());

      break;

    default:
      Alert.alert('STATUS CODE NOT FOUND');
  }

  return yield all([
    put(loginActions.loginFailed(code, response.message.toString())),
    put(projectActions.hideLoader()),
  ]);

  //return yield put(projectActions.hideLoader());
}
