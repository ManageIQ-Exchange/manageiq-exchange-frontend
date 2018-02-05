import * as actions from './typeActions.js';

export function signInSuccess(user) {
  return {
    type: actions.SIGN_IN_SUCCESS,
    user: user
  };
}
export function signInError(user) {
  return {
    type: actions.SIGN_IN_ERROR,
    user: user
  };
}
export function signOutUser() {
  return {
    type: actions.SIGN_OUT
  };
}
export function getDataAPiSuccess(dataApi) {
  return {
    type: actions.DATA_API_SUCCESS,
    dataApi: dataApi
  };
}

export function getDataAPiError() {
  return {
    type: actions.DATA_API_ERROR
  };
}

export function getSpinsUserSuccess(spins) {
  return {
    type: actions.GET_SPINS_SUCCESS,
    spins: spins
  };
}
export function getSpinsUserError() {
  return {
    type: actions.GET_SPINS_ERROR
  };
}
export function reloadSpinSuccess() {
  return {
    type: actions.RELOAD_SPIN_SUCCESS
  };
}
export function reloadSpinError() {
  return {
    type: actions.RELOAD_SPIN_ERROR
  };
}
