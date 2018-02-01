import {
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS
} from '../actions/typeActions';
import { User } from '../models/user';



export const user = (user = new User(), action: any) => {
  let newState = {};
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      newState = { ...user };
      newState.logged = true;
      return newState;
    case SIGN_IN_ERROR:
      newState = new User();
      newState.logged = false;
      return newState;

    default:
      return user;
  }
};
