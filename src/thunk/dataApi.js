import { getDataAPiSuccess, getDataAPiError } from '../actions/index';
import Api from '../service/Api';

export function apiVersion() {
  return dispatch => {
    Api.version()
      .then(response => {
        console.log('response', response.data.data);
        dispatch(getDataAPiSuccess(response.data.data))
      })
      .catch(error => {
        dispatch(getDataAPiError());
      });
  };
}
