/*
 * Action creators are functions that create and return actions .
 */
import * as types from '../../../system/types';

export function requestProductList(perPage) {
  return {
    type: types.PRODUCT_LIST_REQUEST,
    perPage: perPage,
  };
}

export function onProductListResponse(products) {
  return {
    type: types.PRODUCT_LIST_RESPONSE,
    products: products,
  };
}
