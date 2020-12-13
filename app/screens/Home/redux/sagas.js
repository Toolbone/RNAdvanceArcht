import {call, put, takeEvery} from 'redux-saga/effects';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';
import { fetchProductList } from '../../../api/Client';
import * as R from 'ramda';
import * as rootActions from '../../../system/actions';

export const productListSagas = [
  takeEvery(types.PRODUCT_LIST_REQUEST, productListAsync),
];

export function* productListAsync(action) {
  yield put(rootActions.showLoader());
  const { response, error } = yield call(
    fetchProductList,
    action.perPage,
    action.orderBy,
  );

  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
  yield put(rootActions.hideLoader());
}
