import { call, put, takeEvery } from 'redux-saga/effects';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';
import { fetchProductList, loginUser } from '../../../api/Client';
import * as R from 'ramda';

export const productListSagas = [
  takeEvery(types.PRODUCT_LIST_REQUEST, productListAsync),
];

export function* productListAsync(action) {
  const { response, error } = yield call(fetchProductList, action.page);

  if (R.isNil(error)) {
    console.log('response:' + response);
    console.log('error:' + error);
    //const { status } = response;
    //yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
}
