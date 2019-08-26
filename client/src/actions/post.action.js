import Axios from 'axios';
import { setAlert } from './alert.action';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

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


/**
 * Like
 */
export const like = (postID) => async dispatch => {
  console.log('like', postID)
  try {
    const res = await Axios.put(`/api/posts/like/${postID}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data }
    });
  } catch (err) {
    if (err.response)
      dispatch({
        type: POST_ERROR,
        payload: { message: err.response.data.message, status: err.response.data.status }
      });
  }
}


/**
 * unlike
 */
export const unlike = (postID) => async dispatch => {
  console.log('unlike', postID);

  try {
    const res = await Axios.put(`/api/posts/unlike/${postID}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data }
    });
  } catch (err) {
    if (err.response)
      dispatch({
        type: POST_ERROR,
        payload: { message: err.response.data.message, status: err.response.data.status }
      });
  }
}