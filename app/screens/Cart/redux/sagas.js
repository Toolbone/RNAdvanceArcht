import { call, put, takeEvery } from 'redux-saga/effects';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';
import {
  fetchOrderList,
  deleteOrderList,
  addOrderList,
  updateOrderList,
} from '../../../api/Client';
import * as R from 'ramda';
import * as rootActions from '../../../system/actions';

export const orderListSagas = [
  takeEvery(types.ORDER_LIST_REQUEST, orderListAsync),
  takeEvery(types.ORDER_LIST_DELETE, deleteOrderListAsync),
  takeEvery(types.ORDER_LIST_ADD, addOrderListAsync),
  takeEvery(types.ORDER_LIST_UPDATE, updateOrderListAsync),
];
export function* addOrderListAsync(action) {
  yield put(rootActions.showLoader());
  const { response, error } = yield call(addOrderList, action.data);
  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
  yield put(rootActions.hideLoader());
}

export function* updateOrderListAsync(action) {
  yield put(rootActions.showLoader());
  const { response, error } = yield call(
    updateOrderList,
    action.id,
    action.data,
  );
  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
  yield put(rootActions.hideLoader());
}

export function* orderListAsync(action) {
  yield put(rootActions.showLoader());
  const { response, error } = yield call(
    fetchOrderList,
    action.customerId,
    action.paymentStatus,
  );

  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
  yield put(rootActions.hideLoader());
}

export function* deleteOrderListAsync(action) {
  yield put(rootActions.showLoader());
  const { response, error } = yield call(deleteOrderList, action.id);
  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
  yield put(rootActions.hideLoader());
}
