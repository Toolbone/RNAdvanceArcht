import RemoteData from 'app/api/RemoteData';
import ApiConstants from './ApiConstants';

export function loginUser(username, password) {
  return RemoteData.post(ApiConstants.LOGIN, {
    username: username,
    password: password,
  })

    .then((response) => ({ response }))
    .then((json) => json)
    .catch((error) => error);
}

export function logoutUser(token) {
  return RemoteData.post(ApiConstants.LOGOUT, {
    JWT: token,
  })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function fetchProductList(page) {
  return RemoteData.get(ApiConstants.PRODUCT_LIST, {
    per_page: page,
    consumer_key: ApiConstants.KEY,
    consumer_secret: ApiConstants.SECRET,
  })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
