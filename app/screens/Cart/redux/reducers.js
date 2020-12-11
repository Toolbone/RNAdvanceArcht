/* Product Reducer */
import createReducer from 'app/lib/createReducer';
import * as types from '../../../system/types';

export const initialState = {
  orders: [],
  refreshing: false,
  customer: 1,
  status: '',
};

export const orderListReducer = createReducer(initialState, {
  [types.ORDER_LIST_REQUEST](state, action) {
    console.log('WHATS INSIDE' + JSON.stringify(action));
    return {
      ...state,
      customer: action.customerId,
      status: action.paymentStatus,
    };
  },
  [types.ORDER_LIST_RESPONSE](state, action) {
    return {
      ...state,
      orders: action.orders,
    };
  },
  [types.ORDER_LIST_DELETE](state, action) {
    console.log('WHATS INSIDE' + JSON.stringify(action));
    return {
      ...state,
      id: action.id,
    };
  },
});
