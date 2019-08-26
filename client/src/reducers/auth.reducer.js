import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED } from '../actions/types';

const initialState = {
  token: localStorage.getItem('x-access-token'),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('x-access-token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('x-access-token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false
      };

    default:
      return state;
  }
}