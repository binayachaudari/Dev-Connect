import Axios from 'axios';
import { setAlert } from './alert.action';
import { GET_POSTS, POST_ERROR } from './types';

/**
 * Get All Posts
 */
export const getAllPosts = () => async dispatch => {
  try {
    const res = await Axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    if (err.response)
      dispatch({
        type: POST_ERROR,
        payload: { message: err.response.data.message, status: err.response.data.status }
      });
  }
}