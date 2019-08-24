import Axios from 'axios';
import { setAlert } from './alert.action';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_EXPERIENCE, UPDATE_EDUCATION, REMOVE_EXP_OR_EDU, ACCOUNT_DELETED, CLEAR_PROFILE } from './types';
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

/**
 * Add Experience
 */
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await Axios.post('/api/profile/experience', formData, config)

    dispatch({
      type: UPDATE_EXPERIENCE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success', 3000));
    history.push('/dashboard');

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



/**
 * Add Education
 */
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await Axios.post('/api/profile/education', formData, config)

    dispatch({
      type: UPDATE_EDUCATION,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success', 3000));
    history.push('/dashboard');

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

/**
 * Delete Experience OR Education
 */
export const deleteExpOrEdu = (id, endPoint) => async dispatch => {
  try {
    const res = await Axios.delete(`/api/profile/${endPoint}/${id}`);
    dispatch({
      type: REMOVE_EXP_OR_EDU,
      payload: res.data
    });
    dispatch(setAlert('Profile Updated', 'success', 3000));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { message: err.response.data.message, status: err.response.data.status }
    });
  }
}

/**
 * Delete Account AND Profile
 */
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This cannot be UNDONE!')) {
    try {
      await Axios.delete('/api/profile/me');
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Account Has Been Permanantly Deleted!', 3000));
    } catch (err) {
      // console.log(err)

      dispatch({
        type: PROFILE_ERROR,
        payload: err
      });
    }
  }
}

