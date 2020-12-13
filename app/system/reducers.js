/* App Reducer
 * handles app states
 * Reducers intercept the actions created by the action creators and modify the application state accordingly.
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/system/types';

const initialState = {
  type: types.DISABLE_LOADER,
  isLoading: false,
  totalLoaded: 0,
};

export const rootReducer = createReducer(initialState, {
  [types.ENABLE_LOADER](state, action) {
    return {
      ...state,
      isLoading: action.isLoading,
      totalLoaded: state.totalLoaded + action.totalLoaded,
    };
  },
  [types.DISABLE_LOADER](state, action) {
    return {
      ...state,
      isLoading: state.totalLoaded - action.totalLoaded !== 0,
      totalLoaded: state.totalLoaded - action.totalLoaded,
    };
  },
});
