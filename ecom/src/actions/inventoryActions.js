import axios from 'axios';
import { GET_ERRORS, GET_INVENTORY } from './types';

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
