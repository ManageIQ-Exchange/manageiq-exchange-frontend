import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionsCreator from '../thunk/spin';
import * as types from '../actions/typeActions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import { ApiGetSpins } from '../service/Api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('async actions', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };
    window.localStorage = localStorageMock;
  });

  it('Search', () => {
    const spins = [
      { id: 1, tags: ['open source', 'public'], full_name: 'repo_name' }
    ];
    const url = `${ApiGetSpins}?limit=5&sort=user_login&page=1&author=test&expand=resources`;
    mock.onGet(url).reply(200, {
      spins
    });

    const expectedActions = [
      { type: types.SEARCH_LOADING, isLoading: true },
      { type: types.GET_SPINS_SEARCH_SUCCESS, spins: { spins } },
      { type: types.SEARCH_LOADING, isLoading: false }
    ];

    const store = mockStore({});

    const params = { limit: 5, sort: 'user_login', page: 1, author: 'test' };

    return store.dispatch(actionsCreator.getSpinSearch(params)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
