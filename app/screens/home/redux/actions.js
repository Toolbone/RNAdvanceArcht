/*
 * Action creators are functions that create and return actions .
 */
import * as types from '../../../system/types';

export function requestProductList(page) {
  return {
    type: types.PRODUCT_LIST_REQUEST,
    page: page,
  };
}

export function onProductListResponse(products) {
  return {
    type: types.PRODUCT_LIST_RESPONSE,
    products: products,
  };
}
