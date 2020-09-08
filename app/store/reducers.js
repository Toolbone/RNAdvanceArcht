/*
 * combines all th existing reducers
 */
import * as projectReducer from '../system/reducers';
import * as loginReducer from '../screens/login/redux/reducers';
export default Object.assign({}, loginReducer, projectReducer);
