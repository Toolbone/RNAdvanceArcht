/* App config for apis
 */
const ApiConstants = {
  BASE_URL: 'http://www.toolbone.com/loginme/',
  BASE_URL_SECURE: 'https://www.toolbone.com/loginme/',
  LOGIN: '?rest_route=/jwt/v1/auth',
  LOGOUT: '?rest_route=/jwt/v1/auth/revoke',
  PRODUCT_LIST: 'wp-json/wc/v3/products',
  KEY: 'ck_a10c86e6562e59a8d934213b4476fa6e478da8e3',
  SECRET: 'cs_801a3b83422cbba8d5d4feaa6811fd8fde5a1ade',
};

export default ApiConstants;
