import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'App.css';
import { titleUpperCase } from 'utils/common';
import { RandomEpisode } from 'components/lib/RandomEpisode';
import { Video } from 'components/lib/Video';
import { LoadingSpinner } from 'components/lib/LoadingSpinner';
import { getAllEpisodes } from 'utils/services';

export const WatchSeries = () => {
  const { series } = useParams();
  const seriesTitle = titleUpperCase(series);

  const { search } = useLocation();
  const videoFile = search.split('?')[1];

  let history = useHistory();

  const [episodeIndex, setEpisodeIndex] = useState({});
  const [allEpisodes, setAllEpisodes] = useState([]);

  useEffect(() => {
    for (let x = 0; x < allEpisodes.length; x++) {
      if (allEpisodes[x].video_file === videoFile) {
        setEpisode(allEpisodes[x]);

        const maxEp = allEpisodes.length - 1;
        const prevEp = x === 0 ? allEpisodes[maxEp] : allEpisodes[x - 1];
        const nextEp = x === maxEp ? allEpisodes[0] : allEpisodes[x + 1];

        setEpisodeIndex({ previous: prevEp, next: nextEp });
        return;
      }
    }
    setEpisode({});
  }, [allEpisodes, videoFile]);

  const [episode, setEpisode] = useState({});

  useEffect(() => {
    if (allEpisodes.length && !episode.video_file) {
      history.push('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode, history]);

  useEffect(() => {
    getAllEpisodes(series)
      .then((res) => {
        setAllEpisodes(res);
      })
      .catch((err) => {});
  }, [series]);

  const playNextEpisode = () => {
    setEpisode(episodeIndex.next);
    history.push(`${window.location.pathname}?${episodeIndex.next.video_file}`);
  };

  return (
    <div className="App">
      <br />
      {episode.video_file ? (
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

          <Video title={episode} playNextEpisode={playNextEpisode} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
