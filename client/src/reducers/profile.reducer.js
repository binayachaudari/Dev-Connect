import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_EXPERIENCE, UPDATE_EDUCATION, REMOVE_EXP_OR_EDU, GET_ALL_PROFILES, GET_GITHUB_REPOS } from '../actions/types';

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
    case UPDATE_EXPERIENCE:
    case UPDATE_EDUCATION:
      return {
        ...state,
        ...payload,
        loading: false
      };

    case GET_ALL_PROFILES:
      return {
        ...state,
        developer_profiles: payload,
        loading: false
      }

    case GET_GITHUB_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      }

    case REMOVE_EXP_OR_EDU:
      return {
        ...state,
        profile: payload,
        loading: false
      }

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