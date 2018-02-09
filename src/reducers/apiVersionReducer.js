import {
  DATA_API_SUCCESS,
  DATA_API_ERROR
} from '../actions/typeActions';
import { User } from '../models/user';

export const apiVersion = (apiVersion = {}, action: any) => {
  let newState = {};
  switch (action.type) {
    case DATA_API_SUCCESS:
      newState = Object.assign({}, action.dataApi);
      return newState;
    case DATA_API_ERROR:
      return apiVersion;
    default:
      return apiVersion;
  }
};
