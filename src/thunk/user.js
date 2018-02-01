import { sessionUserDataSave } from '../components/SocialButtonLogin/utils';
import { signInSuccess, signInError } from '../actions/index';
import Api from '../service/Api';

export function signIn(code, provider) {
  return dispatch => {
    Api.SignIn(code, provider)
      .then(response => {
        let user = {...response.data.data.user}
        user.authentication_token = response.data.data.authentication_token
        sessionUserDataSave(response.data.data);
        dispatch(signInSuccess(user));
      })
      .catch(error => {
        dispatch(signInError());
      });
  };
}
