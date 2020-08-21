// Creates unique/universal id
import { v4 as uuidv4 } from 'uuid';
// Import the action types to dispatch them with the proper data
import { SET_ALERT, REMOVE_ALERT } from './types';

//We are able to send more than one action with 'dispatch'
// alertType is basically for style purposes. E.i. '.alert-danger'
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  //call the set alert of the reducer and give it data.
  dispatch({
    type: SET_ALERT, 
    // Important: this is the data of our action (state)
    payload: { msg, alertType, id }
  });

  setTimeout( () => dispatch({ 
    type: REMOVE_ALERT, payload: id 
  }), timeout);
};
