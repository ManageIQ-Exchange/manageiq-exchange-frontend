import { getTopSuccess, getTopError } from '../actions/index';
import Api from '../service/Api';

export function getTops() {
  return dispatch => {
    return Api.GetTops()
      .then(response => {
        dispatch(getTopSuccess(response.data))
      })
      .catch(error => {
        dispatch(getTopError(error));
      });
  };
}
