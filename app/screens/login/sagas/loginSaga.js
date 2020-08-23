import { put, call, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Alert } from 'react-native';
import loginUser from 'app/api/methods/loginUser';
import * as loginActions from '../actions';

// Our worker Saga that logins the user
export default function* loginAsync(action) {
  yield put(loginActions.enableLoader());

  //how to call api
  const { response, error } = yield call(
    loginUser,
    action.email,
    action.password,
  );
  console.log('-----------------');
  console.log(JSON.stringify(action));
  console.log(JSON.stringify(response));
  console.log('-----------------');

  //mock response
  //const response = { success: true, data: { id: 1 } };

  if (response.token) {
    yield all([
      put(loginActions.onLoginResponse(response)),
      put(loginActions.disableLoader({})),
    ]);
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader({}));
    setTimeout(() => {
      Alert.alert('Status', response.error);
    }, 200);
  }
}
