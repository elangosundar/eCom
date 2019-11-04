import { ADD_TO_CART } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.payload;
    default:
      return state;
  }
}
