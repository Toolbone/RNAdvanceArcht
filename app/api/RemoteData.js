// General api to access data
import Axios, { AxiosResponse } from 'axios';
import * as Config from './env';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const encodedToken = Buffer.from(
  `${Config.env.KEY}:${Config.env.SECRET}`,
  'utf8',
).toString('base64');

const client = Axios.create({
  baseURL: Config.env.BASE_URL_SECURE,
  timeout: 60000,
  headers: {
    'Cache-Control': 'no-cache',
    'User-Agent': 'RNAdvanceArcht--v1.0.0',
    'X-App-Version': 'v1.0.0',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Basic ${encodedToken}`,
  },
});

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
