import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionsCreatorTop from '../thunk/top';
import * as actionsCreatorTags from '../thunk/tags';
import * as types from '../actions/typeActions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import { ApiTops, ApiTags } from '../service/Api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('async actions', () => {
  it('Explore', () => {
    const tops = {
      mostStarred: {
        name: '',
        data: []
      },
      mostWatched: {
        name: '',
        data: []
      },
      mostDownloaded: {
        name: '',
        data: []
      },
      topTags: {
        name: '',
        data: []
      },
      topContributors: {
        name: '',
        data: []
      },
      Newest: {
        name: '',
        data: []
      }
    };
    const url = `${ApiTops}`;
    mock.onGet(url).reply(200, {
      data: tops
    });

    const expectedActions = [{ type: types.GET_TOP_SUCCESS, tops: tops }];

    const store = mockStore({});

    return store.dispatch(actionsCreatorTop.getTops()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('Tags', () => {
    const tags = ['popular', 'public', 'private'];
    const url = `${ApiTags}`;
    mock.onGet(url).reply(200, {
      data: { tags }
    });

    const expectedActions = [{ type: types.GET_TAGS_SUCCESS, tags: { tags } }];

    const store = mockStore({});

    return store.dispatch(actionsCreatorTags.getPopularTag()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
