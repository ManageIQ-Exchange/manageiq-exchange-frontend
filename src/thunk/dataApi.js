import { getDataAPiSuccess, getDataAPiError } from '../actions/index';
import Api from '../service/Api';

export function apiVersion() {
  return dispatch => {
    Api.version()
      .then(response => {
        dispatch(getDataAPiSuccess(response.data.data))
      })
      .catch(error => {
        dispatch(getDataAPiError());
      });
  };
}
