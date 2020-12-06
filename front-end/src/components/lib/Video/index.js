import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getAuthTokens, newAuthToken } from 'utils/auth';
import { createWatchHistory, getWatchHistoryRecord } from 'utils/services';
import './index.css';

const { REACT_APP_WHR_INTERVAL } = process.env;

export const Video = ({ title, playNextEpisode }) => {
  const [src, setSrc] = useState(null);
  const [firstPageLoad, setFirstPageLoad] = useState(true);
  let WHR_CurrentTime = null;

  const vid = useRef(null);

  const signedInUser = async () => {
    const { auth, refresh } = getAuthTokens();

    if (!auth || !refresh) {
      alert('Log in to view content');
      return;
    }

    const postWHRLoop = setInterval(() => {
      if (!vid) stopPostWHRLoop();

      const { currentTime, duration } = vid.current;
      const watchedPercentage = Math.floor((currentTime / duration) * 100);

      if (WHR_CurrentTime !== currentTime && currentTime !== 0) {
        createWatchHistory(title, currentTime, watchedPercentage);
        WHR_CurrentTime = currentTime;
      }

      if (playNextEpisode && watchedPercentage > 99) {
        playNextEpisode();
      }
    }, REACT_APP_WHR_INTERVAL);

    const stopPostWHRLoop = () => {
      clearInterval(postWHRLoop);
    };

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
        if (err.response && err.response.status === 401) {
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

  const onCanPlayEvent = async () => {
    if (!firstPageLoad) return;

    vid.current.pause();

    const historyRecord = await getWatchHistoryRecord(title.id);

    WHR_CurrentTime = historyRecord.watched_time;

    historyRecord && historyRecord.watched_percentage < 95
      ? (vid.current.currentTime = historyRecord.watched_time)
      : (vid.current.currentTime = '0');

    vid.current.play();
    setFirstPageLoad(false);
  };

  useEffect(() => {
    signedInUser();
    setFirstPageLoad(true);
  }, [title]);

  return (
    <video
      className="video"
      src={src}
      align="center"
      width="75%"
      ref={vid}
      controls
      autoPlay
      onCanPlay={onCanPlayEvent}
    />
  );
};
