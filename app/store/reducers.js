/*
 * combines all th existing reducers
 */
import * as loginReducer from 'app/screens/login/reducers/loginReducer';
import * as projectReducer from 'app/config/reducer';
export default Object.assign({}, loginReducer, projectReducer);
