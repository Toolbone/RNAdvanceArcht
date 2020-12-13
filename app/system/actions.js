import * as types from './types';
import NavigationService from '../navigation/NavigationService';

//action Creators
export function showLoader() {
  return {
    type: types.ENABLE_LOADER,
    isLoading: true,
    totalLoaded: 1,
  };
}

export function hideLoader() {
  return {
    type: types.DISABLE_LOADER,
    isLoading: false,
    totalLoaded: 1,
  };
}

export function resetToHome(params) {
  NavigationService.reset('Home', params);
}
