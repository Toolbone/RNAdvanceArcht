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

export function deleteOrderList(orderId) {
  return {
    type: types.ORDER_LIST_DELETE,
    id: orderId,
  };
}

export function onOrderListResponse(orders) {
  return {
    type: types.ORDER_LIST_RESPONSE,
    orders: orders,
  };
}
