import {
  getSpinSuccess,
  getSpinError
} from "../actions/index";
import Api from "../service/Api";

export function getSpin(id) {
  return dispatch => {
    return Api.GetSpin(id)
      .then(response => {
        let spin = { ...response.data };
        dispatch(getSpinSuccess(spin));
      })
      .catch(error => {
        dispatch(getSpinError());
      });
  };
}
