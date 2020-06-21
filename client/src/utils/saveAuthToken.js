import Axios from 'axios';

const setAuthToken = (token = localStorage.getItem('x-access-token')) => {
  if (token) {
    Axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete Axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthToken;
