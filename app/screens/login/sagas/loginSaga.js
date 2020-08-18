/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Alert } from 'react-native';
import loginUser from 'app/api/methods/loginUser';
import * as loginActions from '../actions';

// Our worker Saga that logins the user
export default function* loginAsync(action) {
  yield put(loginActions.enableLoader());

  //how to call api
  const response = yield call(loginUser, action.email, action.password);
  console.log('-----------------');
  console.log(JSON.stringify(action));
  console.log(JSON.stringify(response));

  //mock response
  //const response = { success: true, data: { id: 1 } };

  if (response.token) {
    yield put(loginActions.onLoginResponse(response));
    yield put(loginActions.disableLoader({}));

    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader({}));
    setTimeout(() => {
      Alert.alert('BoilerPlate', response.Message);
    }, 200);
  }
}
