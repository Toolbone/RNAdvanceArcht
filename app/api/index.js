// General api to access data
import ApiConstants from './ApiConstants';
import Axios from 'axios';

export default function api(path, params, method, token) {
  let options;
  options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { token: token }),
    },
    method: method,
    ...(params && { body: JSON.stringify(params) }),
  };

  /* preparing for Axios
  const client = Axios.create({
    baseURL: ApiConstants.BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { token: token }),
    },
    data: {
      // client_id: apiConfig.clientId,
      // client_secret: apiConfig.clientSecret,
      //: 'password',
      scope: '*',
    },
  });*/

  return fetch(ApiConstants.BASE_URL + path, options)
    .then(resp => resp.json())
    .then(json => json)
    .catch(error => error);
}

export const updateAuthHeader = token => {
  return token;
};
