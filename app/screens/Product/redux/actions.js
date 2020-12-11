/*
 * Action creators are functions that create and return actions .
 */
import * as types from '../../../system/types';

export function requestProductDetails(id) {
  return {
    type: types.PRODUCT_DETAILS_REQUEST,
    id: id,
  };
}

export function onProductDetailsResponse(product) {
  return {
    type: types.PRODUCT_DETAILS_RESPONSE,
    product: product,
  };
}
