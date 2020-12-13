//To make the actions and response codes to be centralised, full control of the flow
//We will aim to cover/handle all possible error either propagating error to the user or recovering from anticipated error.
//This acts as our centralise error handling mechanism which enables easily migrate our error handling to a centralise SDK.

import { all, put, fork, select } from 'redux-saga/effects';
import * as loginActions from '../screens/Login/redux/actions';
import * as rootActions from '../system/actions';
import * as productListActions from '../screens/Home/redux/actions';
import * as productDetailsActions from '../screens/Product/redux/actions';
import * as customerDetailsActions from '../screens/Profile/redux/actions';
import * as orderListActions from '../screens/Cart/redux/actions';
import * as types from '../system/types';
import * as loginSelector from '../screens/Login/redux/selectors';

const StatusCode = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  INVALID_CREDENTIALS: 400,
  BAD_REQUEST: 404,
  BAD_GATEWAY: 500,
  SERVICE_UNAVAILABLE: 503,
  TOO_MANY_REQUESTS: 429,
  NO_RESPONSE: 444,
  INTERNAL_SERVER_ERROR: 500,
});

let statusCode = null;

export function* controlledStates(
  response,
  responseType,
  code,
  showLogs = true,
) {
  statusCode = code;
  response && showLogs && displayLogs(response, responseType);

  switch (responseType) {
    case types.LOGIN_REQUEST:
      return yield onLoginRequest(response);
    case types.LOGOUT_REQUEST:
      return yield onLogoutRequest();
    case types.CUSTOMER_DETAILS_REQUEST:
      return yield onCustomerDetailsRequest(response);
    case types.PRODUCT_LIST_REQUEST:
      return yield onProductListRequest(response);
    case types.PRODUCT_DETAILS_REQUEST:
      return yield onProductDetailsRequest(response);
    case types.CUSTOMER_DETAILS_UPDATE:
      return yield onCustomerDetailUpdate(response);
    case types.ORDER_LIST_REQUEST:
      return yield onOrderListRequest(response);
    case types.ORDER_LIST_DELETE:
      return yield onOrderListDelete(response);
    case types.ORDER_LIST_ADD:
      return yield onOrderListAdd(response);
    case types.ORDER_LIST_UPDATE:
      return yield onOrderListUpdate(response);
    default:
      return;
  }
}

function displayLogs(response, type) {
  const liner = '\n____________________________\n';
  const data = 'Response: ' + JSON.stringify(response) + '\nCode:' + statusCode;
  console.log(liner + type + '\n' + data + liner);
}

function* onLoginRequest(response) {
  //Set the store values for login
  let message = '';
  let isLoggedIn = false;
  let userID = -1;
  switch (statusCode) {
    case StatusCode.SUCCESS:
    case StatusCode.CREATED:
      message = 'Personalizing...';
      isLoggedIn = true;
      userID = response.data?.user?.data?.ID;
      break;
    case StatusCode.INVALID_CREDENTIALS:
      message = 'Sorry, Wrong user credentials';
      break;
    case StatusCode.BAD_GATEWAY:
      message = 'Connection Issue';
      break;
    default:
      message = 'Please try again';
      break;
  }
  return yield all([
    //isLoggedIn && fork(updateAuthHeader, response.data?.data?.jwt),
    isLoggedIn && put(productListActions.requestProductList(20)),
    isLoggedIn && put(customerDetailsActions.requestCustomerDetails(userID)),
    isLoggedIn && put(orderListActions.requestOrderList(userID, 'pending')),
    put(loginActions.onLoginResponse(response, message, isLoggedIn)),
  ]);
}

function* onLogoutRequest() {
  return yield all([put(loginActions.onLogoutResponse())]);
}

function* onCustomerDetailsRequest(response) {
  return yield all([
    put(customerDetailsActions.onCustomerDetailsResponse(response?.data)),
  ]);
}

function* onProductListRequest(response) {
  return yield all([
    put(productListActions.onProductListResponse(response?.data)),
  ]);
}

function* onProductDetailsRequest(response) {
  const userID = yield select(loginSelector.userId);
  return yield all([
    put(productDetailsActions.onProductDetailsResponse(response?.data)),
    put(orderListActions.requestOrderList(userID, 'pending')),
  ]);
}

function* onCustomerDetailUpdate(response) {
  return yield all([
    put(customerDetailsActions.onCustomerDetailsResponse(response?.data)),
  ]);
}

function* onOrderListRequest(response) {
  return yield all([put(orderListActions.onOrderListResponse(response?.data))]);
}

function* onOrderListAdd(response) {
  const userID = yield select(loginSelector.userId);
  return yield all([put(orderListActions.requestOrderList(userID, 'pending'))]);
}

function* onOrderListUpdate(response) {
  const userID = yield select(loginSelector.userId);
  return yield all([put(orderListActions.requestOrderList(userID, 'pending'))]);
}

function* onOrderListDelete(response) {
  const userID = yield select(loginSelector.userId);
  return yield all([put(orderListActions.requestOrderList(userID, 'pending'))]);
}
