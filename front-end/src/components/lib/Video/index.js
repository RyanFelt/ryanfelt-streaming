import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getAuthTokens, newAuthToken } from 'utils/auth';
import { createWatchHistory, getWatchHistoryRecord } from 'utils/services';
import './index.css';

export const Video = React.memo(({ title, playNextEpisode }) => {
  const [src, setSrc] = useState(null);

  const vid = useRef(null);

  const signedInUser = async () => {
    const { auth, refresh } = getAuthTokens();

    if (!auth || !refresh) {
      alert('Log in to view content');
      return;
    }

    const historyRecord = await getWatchHistoryRecord(title.id);

    historyRecord && historyRecord.watched_percentage < 95
      ? (vid.current.currentTime = historyRecord.watched_time)
      : (vid.current.currentTime = '0');

    setInterval(() => {
      const watchedPercentage = Math.floor(
        (vid.current.currentTime / vid.current.duration) * 100
      );

      createWatchHistory(title, vid.current.currentTime, watchedPercentage);

      if (playNextEpisode && watchedPercentage > 99) playNextEpisode();
    }, 15000);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/subscribed`, {
        headers: { Authorization: auth },
      })
      .then((res) => {
        setSrc(
          `${process.env.REACT_APP_BACKEND_URL}/videos/${title.video_file}`
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
