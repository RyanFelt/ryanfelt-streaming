import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { LogOut } from './LogOut';
import '../../css/App.css';

export const Video = React.memo(({ film }) => {
  const [src, setSrc] = useState(null);

  const vid = useRef(null);

  const getNewAuthToken = refresh => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/identity-service/refresh`,
        {
          headers: { Authorization: refresh }
        }
      )
      .then(res => {
        localStorage.setItem('authorizationToken', res.data.authorization);
        signedInUser();
      })
      .catch(err => {
        LogOut();
      });
  };

  const signedInUser = () => {
    const auth = localStorage.getItem('authorizationToken');
    const refresh = localStorage.getItem('refreshToken');

    if (!auth || !refresh) {
      alert('Sign in to stream content');
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/subscribed`, {
        headers: { Authorization: auth }
      })
      .then(res => {
        setSrc(
          `${process.env.REACT_APP_BACKEND_URL}/${film.videoLocation}/${film.videoFile}`
        );
      })
      .catch(err => {
        if (err.response.status === 401) {
          getNewAuthToken(refresh);
          return;
        }
      });
  };

  useEffect(() => {
    signedInUser();
  }, []);

  setInterval(() => {
    console.log(vid.current.currentTime);
  }, 3000);

  return (
    <video src={src} align="center" width="75%" ref={vid} controls autoPlay />
  );
});
