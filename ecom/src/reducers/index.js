import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import inventoryReducer from './inventoryReducer';

export default combineReducers({
  errors: errorReducer,
  inventory: inventoryReducer
});
