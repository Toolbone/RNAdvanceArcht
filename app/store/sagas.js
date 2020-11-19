/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
import { all } from 'redux-saga/effects';
import { loginSagas } from '../screens/login/redux/sagas';
import { productListSagas } from '../screens/home/redux/sagas';

export default function* sagas() {
  yield all([...loginSagas, ...productListSagas]);
}
