import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import '../../css/App.css';
import { titleUpperCase } from '../../utils/common';
import { createWatchHistory } from '../../utils/watchHistory';
import { Video } from '../lib/Video';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import { getAllTitles } from '../../utils/services';

export const Watch = () => {
  const { search } = useLocation();
  const videoFile = search.split('?')[1];

  const [titleInfo, setTitleInfo] = useState({});

  useEffect(() => {
    if (titleInfo.id) createWatchHistory(titleInfo);
  }, [titleInfo]);

  useEffect(() => {
    getAllTitles().then(res => {
      for (let x = 0; x < res.length; x++) {
        if (res[x].videoFile === videoFile) {
          setTitleInfo(res[x]);
          break;
        }
      }
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
