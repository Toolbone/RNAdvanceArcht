// General api to access data
import ApiConstants from './ApiConstants';
import Axios, { AxiosResponse } from 'axios';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js/hmac-sha1';
import { Alert } from 'react-native';

/*

export default client

export default client = Axios.create({
    baseURL: ApiConstants.BASE_URL,
    timeout: 1000,
  });

  const _getOAuth = (): OAuth =>
    new OAuth({
      consumer: {
        key: ApiConstants.KEY,
        secret: ApiConstants.SECRET,
      },
      signature_method: 'HMAC-SHA1',
      hash_function: (baseString: string, key: string) =>
        CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(baseString, key)),
    });

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



  return fetch(ApiConstants.BASE_URL + path, options)
    .then((resp) => resp.json())
    .then((json) => json)
    .catch((error) => error);
}

export const updateAuthHeader = (token) => {
  axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + token
  };
  return token;
};



*/

const client = Axios.create({
  baseURL: ApiConstants.BASE_URL,
});

const _getOAuth = (): OAuth =>
  new OAuth({
    consumer: {
      key: ApiConstants.KEY,
      secret: ApiConstants.SECRET,
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString: string, key: string) =>
      CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(baseString, key)),
  });

const get = async (path: string): Promise<AxiosResponse> => {
  const request = {
    url: `${ApiConstants.BASE_URL}${path}`,
    method: 'GET',
  };
  const oauth = _getOAuth().authorize(request);

  return client.get(request.url, { params: oauth });
};

const post = async (path: string, body: any): Promise<AxiosResponse> => {
  const request = {
    url: `${ApiConstants.BASE_URL}${path}`,
    method: 'POST',
  };
  //const oauth = _getOAuth().authorize(request);
  //Alert.alert(_getOAuth().authorize(request), JSON.stringify(body));
  return client.post(request.url, body);
};

export const updateAuthHeader = (token) => {
  client.defaults.headers.common = {
    Authorization: 'Bearer ' + token,
  };
  return token;
};

export default {
  get,
  post,
};
