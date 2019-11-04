import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import inventoryReducer from './inventoryReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  errors: errorReducer,
  inventory: inventoryReducer,
  cart: cartReducer
});
