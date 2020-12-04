/* Login Reducer
 * handles login states in the app
 * Reducers are functions that specify how the state changes based on a particular action.
 * Reducers intercept the actions created by the action creators and modify the application state accordingly.
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../../../system/types';

const initialState = {
  profile: {},
  id: 1,
};

export const customerDetailsReducer = createReducer(initialState, {
  [types.CUSTOMER_DETAILS_REQUEST](state, action) {
    console.log('WHATS INSIDE' + JSON.stringify(action));
    return {
      ...state,
      id: action.id,
    };
  },
  [types.CUSTOMER_DETAILS_RESPONSE](state, action) {
    return {
      ...state,
      profile: action.profile,
    };
  },
});
