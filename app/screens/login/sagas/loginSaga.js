import { call, put } from 'redux-saga/effects';
import loginUser from 'app/api/methods/loginUser';
import * as projectActions from '../../../config/actions';
import * as sagaController from '../../../controllers/SagaController';

export default function* loginAsync(action) {
  //yield put(projectActions.showLoader()); // useful when we have a root loader UI

  const { response, error } = yield call(
    loginUser,
    action.username,
    action.password,
  );
  yield sagaController.controlledStates(response, error);
}
