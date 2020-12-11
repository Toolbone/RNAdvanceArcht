import { call, takeEvery } from 'redux-saga/effects';
import * as sagaController from '../../../controllers/sagaController';
import * as types from '../../../system/types';
import { fetchOrderList, deleteOrderList } from '../../../api/Client';
import * as R from 'ramda';

export const orderListSagas = [
  takeEvery(types.ORDER_LIST_REQUEST, orderListAsync),
  takeEvery(types.ORDER_LIST_DELETE, deleteOrderListAsync),
];

export function* orderListAsync(action) {
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
}

export function* deleteOrderListAsync(action) {
  const { response, error } = yield call(deleteOrderList, action.id);

  if (R.isNil(error)) {
    const { status } = response;
    yield sagaController.controlledStates(response, action.type, status);
  } else {
    yield sagaController.controlledStates(response, action.type, error);
  }
}
