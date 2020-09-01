/*
 * combines all th existing reducers
 */
import * as projectReducer from '../system/reducers';
import * as loginReducer from '../screens/login/reducers/loginReducer';
export default Object.assign({}, loginReducer, projectReducer);
