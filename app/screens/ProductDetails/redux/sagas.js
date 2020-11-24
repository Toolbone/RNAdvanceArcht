import { call, takeEvery } from 'redux-saga/effects';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';
import { fetchProductDetail } from '../../../api/Client';
import * as R from 'ramda';

export const productDetailsSagas = [
  takeEvery(types.PRODUCT_DETAILS_REQUEST, productDetailsAsync),
];

export function* productDetailsAsync(action) {
  const { response, error } = yield call(fetchProductDetail, action.id);
  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
}
