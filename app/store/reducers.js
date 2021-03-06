/*
 * combines all th existing reducers
 */
import * as rootReducer from '../system/reducers';
import * as loginReducer from '../screens/Login/redux/reducers';
import * as productListReducer from '../screens/Home/redux/reducers';
import * as productDetailsReducer from '../screens/Product/redux/reducers';
import * as profileReducer from '../screens/Profile/redux/reducers';
import * as orderListReducer from '../screens/Cart/redux/reducers';

export default Object.assign(
  {},
  rootReducer,
  loginReducer,
  profileReducer,
  productListReducer,
  productDetailsReducer,
  orderListReducer,
);
