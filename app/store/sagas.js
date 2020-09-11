/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
import { all } from 'redux-saga/effects';
import { loginSagas } from '../screens/login/redux/sagas';
import { productListSagas } from '../screens/home/redux/sagas';

// export default [loginSaga];

export default function* rootSaga() {
  yield all([...loginSagas, ...productListSagas]);
}
