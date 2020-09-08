/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import loginUser from 'app/api/methods/loginUser';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';

export const loginSagas = [takeEvery(types.LOGIN_REQUEST, loginAsync)];

export function* loginAsync(action) {
  const { response, error } = yield call(
    loginUser,
    action.username,
    action.password,
  );
  yield sagaController.controlledStates(response, error);
}
