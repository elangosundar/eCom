import axios from 'axios';
import { ADD_TO_CART, GET_INVENTORY } from './types';

// Pull initial inventory
export const pullInventory = () => dispatch => {
  axios
    .get('api/adminInventory')
    .then(res => {
      dispatch({
        type: GET_INVENTORY,
        payload: res.data.inventory
      });
    })
    .catch(err => console.log(err));
};

export const addToCart = productInfo => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: productInfo
  });
};
