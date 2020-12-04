/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';
import { logoutUser, loginUser, fetchCustomer } from '../../../api/Client';
import * as R from 'ramda';

export const profileSagas = [
  takeEvery(types.CUSTOMER_DETAILS_REQUEST, customerDetailsRequestAsync),
];

export function* customerDetailsRequestAsync(action) {
  const { response, error, json } = yield call(fetchCustomer, action.id);

  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
}
