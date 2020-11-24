// General api to access data
import Axios, { AxiosResponse } from 'axios';

import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import * as Config from './env';

const client = Axios.create({
  baseURL: Config.env.BASE_URL_SECURE,
  timeout: 60000,
  headers: {
    'Cache-Control': 'no-cache',
    'User-Agent': 'RNAdvanceArcht--v1.0.0',
    'X-App-Version': 'v1.0.0',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const _getOAuth = (): OAuth => {
  let data = {
    consumer: {
      key: Config.env.KEY,
      secret: Config.env.SECRET,
    },
    signature_method: 'HMAC-SHA256',
    hash_function: (base_string, key) => {
      return CryptoJS.HmacSHA256(base_string, key).toString(
        CryptoJS.enc.Base64,
      );
    },
  };
  /*if (-1 < ['v1', 'v2'].indexOf(this.version)) {
    data.last_ampersand = false;
  }*/
  return new OAuth(data);
};

const get = async (path: string, params?: any): Promise<AxiosResponse> => {
  const config = {
    url: `${Config.env.BASE_URL_SECURE}${path}`,
    baseURL: Config.env.BASE_URL_SECURE,
    method: 'GET',
    params: params,
  };

  return client.request(config);
};

const post = async (
  path: string,
  params?: any,
  data?: any,
): Promise<AxiosResponse> => {
  const config = {
    url: `${Config.env.BASE_URL_SECURE}${path}`,
    baseURL: Config.env.BASE_URL_SECURE,
    method: 'POST',
    params: params,
    data: data,
  };
  return client.request(config);
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
