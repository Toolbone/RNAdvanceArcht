/*
 * combines all th existing reducers
 */
import * as loginReducer from 'app/screens/login/reducers';
export default Object.assign({}, loginReducer);
