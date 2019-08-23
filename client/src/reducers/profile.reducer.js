import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const intialState = {
  profile: null,
  developer_profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export default (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        ...payload,
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        developer_profiles: [],
        repos: [],
        loading: false,
        error: {}
      };

    default:
      return state;
  }
}