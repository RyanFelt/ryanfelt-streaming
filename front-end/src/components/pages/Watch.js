import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import '../../css/App.css';
import { titleUpperCase } from '../../utils/titleUpperCase';
import { Video } from '../lib/Video';
import { LoadingSpinner } from '../lib/LoadingSpinner';

export const Watch = () => {
  const { search } = useLocation();
  const videoFile = search.split('?')[1];

  const [titleInfo, setTitleInfo] = useState({});

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
          <div className="flex-row-buttons">
            <div className="back-button">
              <Button href={`/`} variant="dark">
                Back
              </Button>
            </div>
            <div className="random-episode"></div>
          </div>

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
