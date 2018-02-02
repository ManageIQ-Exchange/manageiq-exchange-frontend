import { sessionUserDataSave } from '../components/SocialButtonLogin/utils';
import { signInSuccess, signInError, signOutUser } from '../actions/index';
import { recoverUser, deleteUser } from '../storage/'
import Api from '../service/Api';

export function signIn(code, provider) {
  return dispatch => {
    Api.SignIn(code, provider)
      .then(response => {
        let user = { ...response.data.data.user };
        user.authentication_token = response.data.data.authentication_token;
        sessionUserDataSave(response.data.data);
        dispatch(signInSuccess(user));
      })
      .catch(error => {
        dispatch(signInError());
      });
  };
}
export function signOut() {
  return dispatch => {
    deleteUser();
    dispatch(signOutUser());
  }
}

export function checkSessionUser() {
  return dispatch => {
    let user = recoverUser();
    if (user.github_login && user.github_login !== '')
      dispatch(signInSuccess(user));
    else dispatch(signInError());
  };
}
