/*
 * combines all th existing reducers
 */
import * as loginReducer from 'app/screens/login/reducers/loginReducer';
export default Object.assign({}, loginReducer);
