import { call, put, takeEvery } from 'redux-saga/effects';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';
import { fetchProductDetail } from '../../../api/Client';
import * as R from 'ramda';
import * as rootActions from '../../../system/actions';

export const productDetailsSagas = [
  takeEvery(types.PRODUCT_DETAILS_REQUEST, productDetailsAsync),
];

export function* productDetailsAsync(action) {
  yield put(rootActions.showLoader());
  const { response, error } = yield call(fetchProductDetail, action.id);
  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
  yield put(rootActions.hideLoader());
}
