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

const otherInitialState = {
  isLoggedIn: false,
  id: 0,
  token: '',
  username: '',
  password: '',
  message: '',
  error_code: '',
};

export const loginReducer = createReducer(loginInitialState, {
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
  [types.LOGIN_FAILED](state, action) {
    return {
      ...state,
      isLoggedIn: false,
      message: action.message,
    };
  },
  [types.LOG_OUT](state) {
    return {
      ...state,
      isLoggedIn: false,
      token: '',
    };
  },
  [types.LOGIN_RETRY](state, action) {
    return {
      ...state,
      isLoggedIn: false,
      message: action.message,
    };
  },
});

export const otherReducer = createReducer(otherInitialState, {});
