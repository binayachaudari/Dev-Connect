import Axios from 'axios';
import { setAlert } from './alert.action';
import { GET_PROFILE, PROFILE_ERROR } from './types';
import setAuthToken from '../utils/saveAuthToken';

/**
 * Get current user profile
 */
export const getCurrentProfile = () => async dispatch => {
  setAuthToken();

  try {
    const res = await Axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { message: err.response.data.message, status: err.response.data.status }
    });
  }
}

/**
 * Create or Update Profile
 */
export const updateProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await Axios.post('/api/profile', formData, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success', 3000));

    if (!edit) {
      history.push('/dashboard');
    }

  } catch (err) {
    const { message } = err.response.data;

    if (Array.isArray(message)) {
      message.forEach((error, index) => dispatch(setAlert(error.msg, 'danger', 3000 + index * 300)));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { message: err.response.data.message, status: err.response.data.status }
    });
  }
}