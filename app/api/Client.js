import RemoteData from 'app/api/RemoteData';
import ApiConstants from './ApiConstants';
import * as Config from './env';

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

export function fetchProductList(perPage) {
  return RemoteData.get(ApiConstants.PRODUCT_LIST, {
    per_page: perPage,
  })
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
