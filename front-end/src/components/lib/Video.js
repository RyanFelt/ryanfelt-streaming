import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getAuthTokens, newAuthToken } from '../../utils/auth';
import { createWatchHistory, getWatchedTime } from '../../utils/services';
import '../../App.css';

export const Video = React.memo(({ title }) => {
  const [src, setSrc] = useState(null);

  const vid = useRef(null);

  const signedInUser = async () => {
    const { auth, refresh } = getAuthTokens();

    if (!auth || !refresh) {
      alert('Log in to view content');
      return;
    }

    //Get watch history from db else check localstorage
    vid.current.currentTime = await getWatchedTime(title.id);

    setInterval(() => {
      const percentageWatched = Math.floor(
        (vid.current.currentTime / vid.current.duration) * 100
      );

      let watchedTime = vid.current.currentTime;
      if (percentageWatched > 95) {
        watchedTime = 0;
      }

      createWatchHistory(title, watchedTime);
    }, 15000);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/subscribed`, {
        headers: { Authorization: auth },
      })
      .then((res) => {
        setSrc(
          `${process.env.REACT_APP_BACKEND_URL}/videos/lvs_1/${title.video_file}`
        );
      })
      .catch((err) => {
        if (err.response.status === 401) {
          newAuthToken(refresh)
            .then((res) => {
              signedInUser();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  useEffect(() => {
    signedInUser();
  }, []);

  return (
    <video
      className="video"
      src={src}
      align="center"
      width="75%"
      ref={vid}
      controls
      autoPlay
    />
  );
});
