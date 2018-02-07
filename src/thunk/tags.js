import { getTagSuccess, getTagError, addFilterTag } from '../actions/index';
import Api from '../service/Api';

export function getPopularTag() {
  return dispatch => {
    Api.GetTags()
      .then(response => {
        console.log('response', response.data);
        dispatch(getTagSuccess(response.data))
      })
      .catch(error => {
        dispatch(getTagError());
      });
  };
}

export function filterByNewTag(tags, newTag) {
  return dispatch => {
    console.log(tags);
    dispatch(addFilterTag(newTag));
  };
}
