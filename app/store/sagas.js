/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
import { all } from 'redux-saga/effects';
import { loginSagas } from '../screens/Login/redux/sagas';
import { productListSagas } from '../screens/Home/redux/sagas';
import { productDetailsSagas } from '../screens/Product/redux/sagas';
import { profileSagas } from '../screens/Profile/redux/sagas';
import { orderListSagas } from '../screens/Cart/redux/sagas';

export default function* sagas() {
  yield all([
    ...loginSagas,
    ...productListSagas,
    ...productDetailsSagas,
    ...profileSagas,
    ...orderListSagas,
  ]);
}
