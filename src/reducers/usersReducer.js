import {
  GET_USERS_SUCCESS,
  GET_USERS_ERROR
} from '../actions/typeActions';
import { User } from '../models/user';

const initial_state = {
  users:[],
  error:null,
  meta: {}
}
export const users = (state = initial_state, action: any) => {
  let newState = {};
  switch (action.type) {
    case GET_USERS_SUCCESS:
      newState = {...state}
      newState.users = action.users.data;
      newState.meta =  action.users.meta;
      return newState;
    case GET_USERS_ERROR:
      newState = {...state}
      newState.error = action.error;
      return newState;
    default:
      return state;
  }
};
