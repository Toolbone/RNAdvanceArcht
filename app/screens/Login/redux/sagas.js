/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';
import { logoutUser, loginUser } from '../../../api/Client';
import * as R from 'ramda';

export const loginSagas = [
  takeEvery(types.LOGIN_REQUEST, loginRequestAsync),
  takeEvery(types.LOGOUT_REQUEST, logoutRequestAsync),
];

export function* loginRequestAsync(action) {
  const { response, error, json } = yield call(
    loginUser,
    action.username,
    action.password,
  );

  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
}

export function* logoutRequestAsync(action) {
  const { response, error } = yield call(logoutUser, action.token);

  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
}
