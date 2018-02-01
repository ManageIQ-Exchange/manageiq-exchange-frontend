import { sessionUserDataSave } from '../components/SocialButtonLogin/utils';
import { signInSuccess, signInError } from '../actions/index';
import Api from '../service/Api';

export function signIn(code, provider) {
  return dispatch => {
    Api.SignIn(code, provider)
      .then(response => {
        sessionUserDataSave(response.data.data);
        dispatch(signInSuccess(response.data));
      })
      .catch(error => {
        dispatch(signInError());
      });
  };
}
