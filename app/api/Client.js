import RemoteData from 'app/api/RemoteData';
import ApiConstants from './ApiConstants';
import * as Config from './env';
import { isEmpty } from 'ramda';

export function loginUser(username, password) {
  return RemoteData.post(ApiConstants.LOGIN, null, {
    username: username,
    password: password,
    issueJWT: true,
  })
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => error);
}

export function logoutUser(token) {
  return RemoteData.post(ApiConstants.LOGOUT, null, {
    jwt: token,
  })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function fetchCustomer(id) {
  return RemoteData.get(ApiConstants.CUSTOMER + '/' + id)
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => ({ error }));
}

export function updateProfile(id, data) {
  return RemoteData.put(ApiConstants.CUSTOMER + '/' + id, data)
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => ({ error }));
}

export function fetchProductList(perPage, orderBy) {
  let params = {};
  if (isEmpty(orderBy) || orderBy === undefined) {
    params = {
      per_page: isEmpty(perPage) || perPage === undefined ? 100 : perPage,
    };
  } else {
    params = {
      per_page: isEmpty(perPage) || perPage === undefined ? 100 : perPage,
      orderby: orderBy,
    };
  }

  return RemoteData.get(ApiConstants.PRODUCT_LIST, params)
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => ({ error }));
}

export function fetchProductDetail(id) {
  return RemoteData.get(ApiConstants.PRODUCT_DETAIL + '/' + id)
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => ({ error }));
}

export function fetchOrderList(customerId, paymentStatus) {
  let params = {
    customer: customerId,
    status: paymentStatus,
  };

  return RemoteData.get(ApiConstants.PRODUCT_ORDER, params)
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => ({ error }));
}

export function deleteOrderList(id) {
  return RemoteData.remove(ApiConstants.PRODUCT_ORDER + '/' + id, {
    force: true,
  })
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => ({ error }));
}

export function addOrderList(data) {
  return RemoteData.post(ApiConstants.PRODUCT_ORDER, null, data)
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => error);
}

export function updateOrderList(id, data) {
  return RemoteData.put(ApiConstants.PRODUCT_ORDER + '/' + id, data)
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => error);
}

export function deleteProductOrder(id) {
  return RemoteData.remove(ApiConstants.PRODUCT_DETAIL + '/' + id, {
    force: true,
  })
    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => ({ error }));
}
