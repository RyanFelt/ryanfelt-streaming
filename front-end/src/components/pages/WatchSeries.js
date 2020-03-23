import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import '../../css/App.css';
import { titleUpperCase } from '../../utils/common';
import { RandomEpisode } from '../lib/RandomEpisode';
import { Video } from '../lib/Video';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import { getAllEpisodes } from '../../utils/services';

export const WatchSeries = () => {
  const { series } = useParams();
  const seriesTitle = titleUpperCase(series);

  const { search } = useLocation();
  const videoFile = search.split('?')[1];

  let history = useHistory();

  const [allEpisodes, setAllEpisodes] = useState([]);

  useEffect(() => {
    for (let x = 0; x < allEpisodes.length; x++) {
      if (allEpisodes[x].videoFile === videoFile) {
        setEpisode(allEpisodes[x]);

        const maxEp = allEpisodes.length - 1;
        const prevEp =
          x === 0 ? allEpisodes[maxEp].videoFile : allEpisodes[x - 1].videoFile;
        const nextEp =
          x === maxEp ? allEpisodes[0].videoFile : allEpisodes[x + 1].videoFile;

        setEpisodeIndex({ previous: prevEp, next: nextEp });
        return;
      }
    }
    setEpisode({});
  }, [allEpisodes, videoFile]);

  const [episode, setEpisode] = useState({});

  useEffect(() => {
    if (allEpisodes.length && !episode.videoFile) {
      history.push('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode, history]);

  const [episodeIndex, setEpisodeIndex] = useState({});

  useEffect(() => {
    getAllEpisodes(series)
      .then(res => {
        setAllEpisodes(res.data);
      })
      .catch(err => {});
  }, [series]);

  return (
    <div className="App">
      <br />
      {episode.videoFile ? (
        <>
          <div className="flex-row">
            <div className="back-button">
              <Button href={`/series/${series}`} variant="dark">
                Back
              </Button>
            </div>

            {allEpisodes.length ? (
              <RandomEpisode series={series} allEpisodes={allEpisodes} />
            ) : (
              <div />
            )}
          </div>

          <br />

          <h1>{seriesTitle}</h1>
          {episode.season !== 'N/A' ? (
            <h5>
              S{episode.season} - E{episode.episode}
            </h5>
          ) : (
            <h5>E{episode.episode}</h5>
          )}

          <br />

          <Video title={episode} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
