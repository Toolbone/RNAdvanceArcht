import RemoteData from 'app/api/RemoteData';
import ApiConstants from '../ApiConstants';

export default function loginUser(username, password) {
  return RemoteData.post(ApiConstants.LOGIN, { username, password })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
