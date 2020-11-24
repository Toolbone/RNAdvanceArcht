/* Login Reducer
 * handles login states in the app
 * Reducers are functions that specify how the state changes based on a particular action.
 * Reducers intercept the actions created by the action creators and modify the application state accordingly.
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../../../system/types';
import * as Models from '../../../api/Models';
import { ProductsState } from '../../../api/Models';

export const initialState = {
  products: [],
  refreshing: false,
  page: 1,
};

export const productListReducer = createReducer(initialState, {
  [types.PRODUCT_LIST_REQUEST](state, action) {
    console.log('WHATS INSIDE' + JSON.stringify(action));
    return {
      ...state,
      page: action.perPage,
    };
  },
  [types.PRODUCT_LIST_RESPONSE](state, action) {
    return {
      ...state,
      products: action.products,
    };
  },
});
