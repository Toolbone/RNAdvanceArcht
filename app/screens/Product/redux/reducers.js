/* Product Reducer */
import createReducer from 'app/lib/createReducer';
import * as types from '../../../system/types';

export const initialState = {
  product: {},
  id: 1,
};

export const productDetailsReducer = createReducer(initialState, {
  [types.PRODUCT_DETAILS_REQUEST](state, action) {
    console.log('WHATS INSIDE' + JSON.stringify(action));
    return {
      ...state,
      id: action.id,
    };
  },
  [types.PRODUCT_DETAILS_RESPONSE](state, action) {
    return {
      ...state,
      product: action.product,
    };
  },
});
