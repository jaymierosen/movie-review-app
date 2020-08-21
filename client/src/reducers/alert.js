// Alert Reducer is a function that takes a piece of the State and an Action
// The action is going to get dispatched from the action's file

// Import our action types
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// Initial State
const initialState = [];

export default function(state = initialState, action){

  // destructuring
  const {type, payload} = action;
  
  switch(type){
    // In case we want to set a new alert, we make return a state with the action payload (data);
    case SET_ALERT:
      return [...state, payload];
    
      // In case we need to remove the alert, it will filter and  return every alert except the one that matches the action payload.
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    
    default:
      return state;
  }
}