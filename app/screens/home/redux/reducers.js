/* Login Reducer
 * handles login states in the app
 * Reducers are functions that specify how the state changes based on a particular action.
 * Reducers intercept the actions created by the action creators and modify the application state accordingly.
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../../../system/types';
import { Alert } from 'react-native';

const loginInitialState = {
  isLoggedIn: false,
  id: 0,
  token: '',
  username: '',
  password: '',
  message: '',
  error_code: '',
};

export const productListReducer = createReducer(loginInitialState, {
  [types.PRODUCT_LIST_REQUEST](state, action) {
    return {
      ...state,
      page: action.page,
    };
  },
});
