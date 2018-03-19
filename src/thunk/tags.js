import { getTagSuccess, getTagError, addFilterTag } from '../actions/index';
import Api from '../service/Api';

export function getPopularTag() {
  return dispatch => {
    return Api.GetTags()
      .then(response => {
        dispatch(getTagSuccess(response.data.data));
      })
      .catch(() => {
        dispatch(getTagError());
      });
  };
}

export function filterByNewTag(tags, newTag) {
  return dispatch => {
    dispatch(addFilterTag(newTag));
  };
}
