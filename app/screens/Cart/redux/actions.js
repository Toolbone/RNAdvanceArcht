/*
 * Action creators are functions that create and return actions .
 */
import * as types from '../../../system/types';

export function requestOrderList(customerId, paymentStatus?) {
  return {
    type: types.ORDER_LIST_REQUEST,
    customerId: customerId,
    paymentStatus: paymentStatus,
  };
}

export function onOrderListResponse(orders) {
  return {
    type: types.ORDER_LIST_RESPONSE,
    orders: orders,
  };
}

export function updateOrderList(id, data) {
  return {
    type: types.ORDER_LIST_UPDATE,
    id: id,
    data: data,
  };
}

export function addOrderList(data) {
  return {
    type: types.ORDER_LIST_ADD,
    data: data,
  };
}

export function deleteOrderList(orderId) {
  return {
    type: types.ORDER_LIST_DELETE,
    id: orderId,
  };
}
