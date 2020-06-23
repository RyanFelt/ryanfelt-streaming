import axios from 'axios';
import { logOut } from './logOut';

export const newAuthToken = (refresh) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/identity-service/refresh`, {
      headers: { Authorization: refresh },
    })
    .then((res) => {
      localStorage.setItem('authorizationToken', res.data.authorization);

      return true;
    })
    .catch((err) => {
      logOut();
      throw new Error('user logged out');
    });
};

export const getAuthTokens = () => {
  const auth = localStorage.getItem('authorizationToken') || '';
  const refresh = localStorage.getItem('refreshToken') || '';

  return {
    auth,
    refresh,
  };
};

export const isAuthenticated = () => {
  const auth = localStorage.getItem('authorizationToken');
  const refresh = localStorage.getItem('refreshToken');

  if (auth && refresh) return true;

  return false;
};
