import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import { titleUpperCase } from '../../utils/common';
import { createWatchHistory } from '../../utils/watchHistory';
import { Video } from '../lib/Video';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import '../../css/App.css';

export const Watch = () => {
  const { search } = useLocation();
  const videoFile = search.split('?')[1];

  const [titleInfo, setTitleInfo] = useState({});

  useEffect(() => {
    if (titleInfo.id) createWatchHistory(titleInfo);
  }, [titleInfo]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllTitles`)
      .then(res => {
        for (let x = 0; x < res.data.length; x++) {
          if (res.data[x].videoFile === videoFile) {
            setTitleInfo(res.data[x]);
            break;
          }
        }
      })
      .catch(err => {
        console.log('ERROR::', err);
      });
  }, [videoFile]);

  return (
    <div className="App">
      {titleInfo.videoFile ? (
        <>
          <br />
          <h1>{titleUpperCase(titleInfo.title)}</h1>
          <h5>{titleInfo.year} </h5>

          <Video title={titleInfo} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
