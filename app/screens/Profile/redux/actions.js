/*
 * Action creators are functions that create and return actions .
 */
import * as types from '../../../system/types';

export function requestCustomerDetails(id) {
  return {
    type: types.CUSTOMER_DETAILS_REQUEST,
    id: id,
  };
}

export function onCustomerDetailsResponse(profile) {
  return {
    type: types.CUSTOMER_DETAILS_RESPONSE,
    profile: profile,
  };
}
