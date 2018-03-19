import {
  getSpinSuccess,
  getSpinError,
  getSpinsSearchSuccess,
  getSpinsSearchError,
  loadingSearch
} from '../actions/index';
import Api from '../service/Api';

export function getSpin(id) {
  return dispatch => {
    return Api.GetSpin(id)
      .then(response => {
        let spin = { ...response.data };
        dispatch(getSpinSuccess(spin));
      })
      .catch(() => {
        dispatch(getSpinError());
      });
  };
}
export function getSpinSearch(params) {
  return dispatch => {
    dispatch(loadingSearch(true));
    return Api.GetSpins(params)
      .then(response => {
        let spin = { ...response.data };
        dispatch(getSpinsSearchSuccess(spin));
        dispatch(loadingSearch(false));
      })
      .catch(error => {
        dispatch(getSpinsSearchError(error));
        dispatch(loadingSearch(false));
      });
  };
}
