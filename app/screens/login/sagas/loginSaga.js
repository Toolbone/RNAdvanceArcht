import { call, put } from 'redux-saga/effects';
import loginUser from 'app/api/methods/loginUser';
import * as loginActions from '../actions';
import * as sagaController from '../../../controllers/SagaController';

export default function* loginAsync(action) {
  yield put(loginActions.enableLoader()); // useful when we have a root loader UI

  const { response, error } = yield call(
    loginUser,
    action.username,
    action.password,
  );
  yield sagaController.controlledStates(response, error);
}
