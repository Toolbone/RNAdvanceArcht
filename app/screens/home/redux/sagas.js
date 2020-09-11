import { call, put, takeEvery } from 'redux-saga/effects';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';
import { fetchProductList } from '../../../api/Client';

export const productListSagas = [
  takeEvery(types.PRODUCT_LIST_REQUEST, productListAsync),
];

export function* productListAsync(action) {
  const { response, error } = yield call(fetchProductList, action.page);
  yield sagaController.controlledStates(response, error, action.type);
}
