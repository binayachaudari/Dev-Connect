import Axios from 'axios';
import { setAlert } from './alert.action';
import setAuthToken from '../utils/saveAuthToken';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_SINGLE_POST, DISPLAY_POST, ADD_COMMENT, REMOVE_COMMENT } from './types';

/**
 * Get All Posts
 */
export const getAllPosts = () => async dispatch => {
  setAuthToken();
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
 * Display Post from State
 */
export const displayPost = (data) => async dispatch => {
  dispatch({
    type: DISPLAY_POST,
    payload: data
  });
}

/**
 * Get Single Post
 */
export const getSinglePost = (postID) => async dispatch => {
  setAuthToken();
  try {
    const res = await Axios.get(`/api/posts/${postID}`);
    dispatch({
      type: GET_SINGLE_POST,
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

/**
 * Add Post
 */
export const addPost = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await Axios.post('/api/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert('Post Created', 'success', 3000));
  } catch (err) {
    if (err.response)
      dispatch({
        type: POST_ERROR,
        payload: { message: err.response.data.message, status: err.response.data.status }
      });
  }
}

/**
 * Add Comment
 */
export const addComment = (postID, formData) => async dispatch => {
  setAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await Axios.put(`/api/posts/comment/${postID}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment Added', 'success', 3000));
  } catch (err) {
    if (err.response)
      dispatch({
        type: POST_ERROR,
        payload: { message: err.response.data.message, status: err.response.data.status }
      });
  }
}

/**
 * Delete Comment
 */
export const deleteComment = (postID, commentID) => async dispatch => {
  setAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    await Axios.delete(`/api/posts/comment/${postID}/${commentID}`, config);
    dispatch({
      type: REMOVE_COMMENT,
      payload: { commentID }
    });
    dispatch(setAlert('Comment Deleted', 'success', 3000));
  } catch (err) {
    if (err.response)
      dispatch({
        type: POST_ERROR,
        payload: { message: err.response.data.message, status: err.response.data.status }
      });
  }
}



/**
 * Delete Post
 */
export const deletePost = (postID) => async dispatch => {
  try {
    await Axios.delete(`/api/posts/${postID}`);
    dispatch({
      type: DELETE_POST,
      payload: { postID }
    });
    dispatch(setAlert('Post Has been Removed', 'success', 3000));
  } catch (err) {
    if (err.response)
      dispatch({
        type: POST_ERROR,
        payload: { message: err.response.data.message, status: err.response.data.status }
      });
  }
}