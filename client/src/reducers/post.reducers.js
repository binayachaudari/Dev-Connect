import { GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        ...payload,
        loading: false
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}