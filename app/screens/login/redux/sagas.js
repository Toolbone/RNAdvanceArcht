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

export const loginSagas = [
  takeEvery(types.LOGIN_REQUEST, loginAsync),
  takeEvery(types.LOGOUT_REQUEST, logoutAsync),
];

export function* loginAsync(action) {
  const { response, error } = yield call(
    loginUser,
    action.username,
    action.password,
  );
  yield sagaController.controlledStates(response, error, action.type);
}

export function* logoutAsync(action) {
  const { response, error } = yield call(logoutUser, action.token);
  yield sagaController.controlledStates(response, error, action.type);
}
