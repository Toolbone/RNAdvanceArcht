/* Login Reducer
 * handles login states in the app
 * Reducers are functions that specify how the state changes based on a particular action.
 * Reducers intercept the actions created by the action creators and modify the application state accordingly.
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../../../system/types';

const initialState = {
  isLoggedIn: false,
  id: 0,
  token: '',
  username: '',
  password: '',
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      username: action.username,
      password: action.password,
    };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      token: action.token,
      isLoggedIn: true,
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.LOG_OUT](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
});
