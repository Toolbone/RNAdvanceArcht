/*
 * combines all th existing reducers
 */
import * as rootReducer from '../system/reducers';
import * as loginReducer from '../screens/login/redux/reducers';
export default Object.assign({}, loginReducer, rootReducer);
