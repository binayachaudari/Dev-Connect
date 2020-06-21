import Axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import { setAlert } from './alert.action';
import setAuthToken from '../utils/saveAuthToken';

/**
 *
 * Load User
 */
export const loadUser = () => async (dispatch) => {
  setAuthToken();
  try {
    const res = await Axios.get('/api/users');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

/**
 *
 * @param {Object} name     Name of the user
 * @param {Object} email    email of the user
 * @param {Object} password Password of the user
 */
export const register = ({ name, email, password }) => async (dispatch) => {
  const newUser = {
    name,
    email,
    password
  };
  const body = JSON.stringify(newUser);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await Axios.post('/api/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const { message } = err.response.data;

    if (Array.isArray(message)) {
      message.forEach((error, index) => dispatch(setAlert(error.msg, 'danger', 3000 + index * 300)));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

/**
 *
 * @param {Object} email    email of the user
 * @param {Object} password Password of the user
 */
export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await Axios.post('/api/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const { message } = err.response.data;

    if (Array.isArray(message)) {
      message.forEach((error, index) => dispatch(setAlert(error.msg, 'danger', 3000 + index * 300)));
    } else dispatch(setAlert(message, 'danger', 3000));

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

/**
 * LOGOUT
 */
export const logout = (history) => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE
  });

  dispatch({
    type: LOGOUT
  });
};
