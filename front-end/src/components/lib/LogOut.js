import axios from 'axios';

export const LogOut = () => {
  const refresh = localStorage.getItem('refreshToken');

  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/identity-service/signOut`, {
      headers: { Authorization: refresh }
    })
    .then(() => {
      console.log('User signed out');
      localStorage.removeItem('authorizationToken');
      localStorage.removeItem('refreshToken');

      window.location.reload(false);
    })
    .catch(err => {
      console.log('Logout fail', err);
    });
};
