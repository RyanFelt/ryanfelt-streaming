import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { LogOut } from './LogOut';
import '../../css/App.css';

export const Video = React.memo(({ title }) => {
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

    vid.current.currentTime = localStorage.getItem(title.videoFile);

    setInterval(() => {
      const percentageWatched = Math.floor(
        (vid.current.currentTime / vid.current.duration) * 100
      );

      console.log(
        vid.current.currentTime,
        vid.current.duration,
        percentageWatched
      );

      let watchedTime = vid.current.currentTime;
      if (percentageWatched > 95) {
        watchedTime = 0;
      }

      localStorage.setItem(title.videoFile, watchedTime);
    }, 1000);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/subscribed`, {
        headers: { Authorization: auth }
      })
      .then(res => {
        setSrc(
          `${process.env.REACT_APP_BACKEND_URL}/${title.videoLocation}/${title.videoFile}`
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

  return (
    <video src={src} align="center" width="75%" ref={vid} controls autoPlay />
  );
});
