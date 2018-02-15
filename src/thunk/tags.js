import { getTagSuccess, getTagError, addFilterTag } from '../actions/index';
import Api from '../service/Api';

export function getPopularTag() {
  return dispatch => {
    Api.GetTags()
      .then(response => {
        dispatch(getTagSuccess(response.data.data))
      })
      .catch(error => {
        dispatch(getTagError());
      });
  };
}

export function filterByNewTag(tags, newTag) {
  return dispatch => {
    dispatch(addFilterTag(newTag));
  };
}
