/* Login Reducer
 * handles login states in the app
 * Reducers are functions that specify how the state changes based on a particular action.
 * Reducers intercept the actions created by the action creators and modify the application state accordingly.
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../../../system/types';

const loginInitialState = {
  isLoggedIn: false,
  isRequesting: false,
  id: -1,
  token: '',
  username: '',
  password: '',
  message: '',
  statusCode: '',
};

export const loginReducer = createReducer(loginInitialState, {
  [types.LOGIN_REQUEST](state, action) {
    console.log('WHATS INSIDE' + JSON.stringify(action));

    return {
      ...state,
      username: action.username,
      password: action.password,
      isRequesting: action.isRequesting,
      isLoggedIn: action.isLoggedIn,
      message: action.message,
    };
  },
  [types.LOGIN_RESPONSE](state, action) {
    console.log('WHATS INSIDE' + JSON.stringify(action));
    return {
      ...state,
      token: action.token,
      id: action.id,
      statusCode: action.statusCode,
      isRequesting: action.isRequesting,
      isLoggedIn: action.isLoggedIn,
      message: action.message,
    };
  },
  [types.LOGIN_FAILED](state, action) {
    return {
      ...state,
      isLoggedIn: false,
      message: action.message,
    };
  },
  [types.LOGOUT_REQUEST](state, action) {
    console.log('WHATS INSIDE' + JSON.stringify(action));

    return {
      ...state,
      username: action.username,
      password: action.password,
      isRequesting: action.isRequesting,
      isLoggedIn: action.isLoggedIn,
      message: action.message,
    };
  },
  [types.LOGOUT_RESPONSE](state, action) {
    console.log('WHATS INSIDE' + JSON.stringify(action));

    return {
      ...state,
      username: action.username,
      password: action.password,
      isRequesting: action.isRequesting,
      isLoggedIn: action.isLoggedIn,
      message: action.message,
    };
  },
});
