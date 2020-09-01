import { call, put } from 'redux-saga/effects';
import loginUser from 'app/api/methods/loginUser';
import * as projectActions from '../../../system/actions';
import * as sagaController from '../../../controllers/sagaController';

export default function* loginAsync(action) {
  const { response, error } = yield call(
    loginUser,
    action.username,
    action.password,
  );
  yield sagaController.controlledStates(response, error);
}
