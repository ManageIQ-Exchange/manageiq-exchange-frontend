import {
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_IN_LOADING
} from '../actions/typeActions';
import { User } from '../models/user';

const initState={
  user: new User(),
  loading:false,
  logged: false
}
export const user = (user = initState, action: any) => {
  let newState = Object.assign({}, user);
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      newState.user = Object.assign({}, action.user);
      newState.logged = true;
      return newState;
    case SIGN_IN_ERROR:
      newState.logged = false;
      return newState;
    case SIGN_OUT:
      return initState;
    case SIGN_IN_LOADING:
      newState.loading = action.isLoading;
      return newState;
    default:
      return user;
  }
};
