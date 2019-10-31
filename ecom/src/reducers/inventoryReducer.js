import { GET_INVENTORY } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return action.payload;
    default:
      return state;
  }
}
