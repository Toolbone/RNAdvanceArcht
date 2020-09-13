/*
 * combines all th existing reducers
 */
import * as rootReducer from '../system/reducers';
import * as loginReducer from '../screens/login/redux/reducers';
import * as productListReducer from '../screens/home/redux/reducers';
export default Object.assign({}, rootReducer, loginReducer, productListReducer);
