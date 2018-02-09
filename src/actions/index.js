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
export function getUsersSuccess(users) {
  return {
    type: actions.GET_USERS_SUCCESS,
    users: users
  };
}
export function getUsersError(error) {
  return {
    type: actions.GET_USERS_ERROR,
    error:error
  };
}
export function getUserSuccess(user) {
  return {
    type: actions.GET_USER_SUCCESS,
    user: user
  };
}
export function getUserError(error) {
  return {
    type: actions.GET_USER_ERROR,
    error:error
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
export function getSpinSuccess(spin) {
  return {
    type: actions.GET_SPIN_SUCCESS,
    spin: spin
  };
}
export function getSpinError(error) {
  return {
    type: actions.GET_SPIN_ERROR,
    error:error
  };
}
export function getSpinsCandidatesUserSuccess(spins) {
  return {
    type: actions.GET_SPINS_CANDIDATES_SUCCESS,
    spins: spins
  };
}
export function getSpinsCandidatesUserError() {
  return {
    type: actions.GET_SPINS_CANDIDATES_ERROR
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
export function publishSpinSuccess() {
  return {
    type: actions.PUBLISH_SPIN_SUCCESS
  };
}
export function publishSpinError() {
  return {
    type: actions.PUBLISH_SPIN_ERROR
  };
}
export function validateSpinSuccess() {
  return {
    type: actions.VALIDATE_SPIN_SUCCESS
  };
}
export function validateSpinError(error) {
  return {
    type: actions.VALIDATE_SPIN_ERROR,
    error: error
  };
}
export function getTagSuccess(tags) {
  return {
    type: actions.GET_TAGS_SUCCESS,
    tags: tags
  };
}
export function getTagError() {
  return {
    type: actions.GET_TAGS_ERROR
  };
}
export function addFilterTag(filterTag) {
  return {
    type: actions.ADD_POPULAR_TAG_SUCCESS,
    filterTag: filterTag
  };
}
export function getTopSuccess(tops) {
  return {
    type: actions.GET_TOP_SUCCESS,
    tops: tops
  };
}
export function getTopError(error) {
  return {
    type: actions.GET_TOP_ERROR,
    error: error
  };
}
