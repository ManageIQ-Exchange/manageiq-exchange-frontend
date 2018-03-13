import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionsCreator from '../thunk/user';
import * as types from '../actions/typeActions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import { ApiGetUserSpins } from '../service/Api';

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
  it('Get Spin candidates', () => {
    const spins = [
      { id: 1, validation_log: '[OK] Created', full_name: 'repo_name' }
    ];

    mock.onGet(ApiGetUserSpins).reply(200, {
      spins
    });
    const expectedActions = [
      { type: types.GET_SPINS_CANDIDATES_SUCCESS, spins: { spins } }
    ];

    const store = mockStore();
    return store.dispatch(actionsCreator.getUserSpinsCandidates()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('Publish Spin candidate', () => {
    const spinCandidateId = 1;
    const url = `${ApiGetUserSpins}${spinCandidateId}/publish`;
    mock.onPost(url).reply(200);

    const expectedActions = [{ type: types.PUBLISH_SPIN_SUCCESS }];

    const store = mockStore();
    return store
      .dispatch(actionsCreator.publishSpin(spinCandidateId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('Unpublish Spin candidate', () => {
    const spinCandidateId = 1;
    const url = `${ApiGetUserSpins}${spinCandidateId}/unpublish`;
    mock.onPost(url).reply(200);

    const expectedActions = [
      { type: types.SPINS_CANDIDATES_LOADING, isLoading: true },
      { type: types.UNPUBLISH_SPIN_SUCCESS },
      { type: types.SPINS_CANDIDATES_LOADING, isLoading: false }
    ];

    const store = mockStore();
    return store
      .dispatch(actionsCreator.unpublishSpin(spinCandidateId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Refresh Spin candidate', () => {
    const url = `${ApiGetUserSpins}refresh`;
    mock.onPost(url).reply(200);

    const expectedActions = [{ type: types.RELOAD_SPIN_SUCCESS }];

    const store = mockStore();
    return store.dispatch(actionsCreator.refreshSpins()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Validate Spin candidate', () => {
    const spinCandidateId = 1;
    const url = `${ApiGetUserSpins}${spinCandidateId}/validate`;
    mock.onPost(url).reply(200);

    const expectedActions = [{ type: types.VALIDATE_SPIN_SUCCESS }];

    const store = mockStore();

    return store
      .dispatch(actionsCreator.validateSpin(spinCandidateId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
