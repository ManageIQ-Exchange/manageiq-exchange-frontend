import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionsCreator from '../thunk/user';
import * as types from '../actions/typeActions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import { ApiSignin, ApiSignout } from '../service/Api';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

const user = { user_id: 1, name: 'name user' };
const userAction = Object.assign(user, {
  authentication_token: '7mu_vs7pjh2vMvGy94Zr'
});
let store = mockStore({});

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

  it('Log in', () => {
    mock.onPost(ApiSignin).reply(200, {
      data: {
        user,
        authentication_token: '7mu_vs7pjh2vMvGy94Zr'
      }
    });

    const expectedActions = [
      { type: types.SIGN_IN_LOADING, isLoading: true },
      { type: types.SIGN_IN_SUCCESS, user: userAction },
      { type: types.SIGN_IN_LOADING, isLoading: false }
    ];

    const code = '9898989';
    const provider = 'github.com';

    return store.dispatch(actionsCreator.signIn(code, provider)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  /*
  it('Log out', () => {
    mock.onDelete(ApiSignout).reply(200);

    const expectedActions = [{ type: types.SIGN_OUT }];
    const store = mockStore({ user: {} });
    return store.dispatch(actionsCreator.signOut()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  }); */
});
