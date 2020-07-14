import { SET_ALERT, GET_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4(); // returns a random string
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
}