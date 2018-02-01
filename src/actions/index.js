import { SIGN_IN_ERROR, SIGN_IN_SUCCESS } from './typeActions.js';

export function signInSuccess(user) {
  return {
    type: SIGN_IN_SUCCESS,
    user: user
  };
}
export function signInError(user) {
  return {
    type: SIGN_IN_ERROR,
    user: user
  };
}
