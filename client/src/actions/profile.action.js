import React, { Component } from 'react';
import Axios from 'axios';
import setAlert from './alert.action';
import { GET_PROFILE, PROFILE_ERROR } from './types';
import setAuthToken from '../utils/saveAuthToken';




//Get current user profile
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