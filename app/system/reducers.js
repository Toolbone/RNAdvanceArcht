/* App Reducer
 * handles app states
 * Reducers intercept the actions created by the action creators and modify the application state accordingly.
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/system/types';

const initialState = {
  isLoading: false,
};

export const projectReducer = createReducer(initialState, {
  [types.ENABLE_LOADER](state, action) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  },
  [types.DISABLE_LOADER](state, action) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  },
});
