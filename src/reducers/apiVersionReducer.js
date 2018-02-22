import {
  DATA_API_SUCCESS,
  DATA_API_ERROR
} from '../actions/typeActions';

const stateDefault = {
  dataApi: {},
  error: null
};

export const apiVersion = (apiVersion = stateDefault, action: any) => {
  let newState = Object.assign({}, apiVersion);
  switch (action.type) {
    case DATA_API_SUCCESS:
      newState.dataApi = Object.assign({}, action.dataApi);
      return newState;
    case DATA_API_ERROR:
      newState.error = action.error;
      return newState;
    default:
      return newState;
  }
};
