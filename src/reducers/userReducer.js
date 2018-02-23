import {
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_IN_LOADING,
  NOT_SIGN_IN
} from '../actions/typeActions';
import { User } from '../models/user';

const initState = {
  user: new User(),
  loading: false,
  logged: false,
  error: null
};
export const user = (user = initState, action: any) => {
  let newState = Object.assign({}, user);
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      newState.user = Object.assign({}, action.user);
      newState.logged = true;
      newState.error = null;
      return newState;
    case SIGN_IN_ERROR:
      newState.logged = false;
      newState.error = action.error;
      return newState;
    case SIGN_OUT:
      return initState;
    case SIGN_IN_LOADING:
      newState.loading = action.isLoading;
      return newState;
    case NOT_SIGN_IN:
      newState.logged = false;
      return newState;
    default:
      return user;
  }
};
