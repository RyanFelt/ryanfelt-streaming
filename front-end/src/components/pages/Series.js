import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import { EpisodeLayout } from '../lib/EpisodeLayout';
import { titleUpperCase } from '../../utils/common';
import { RandomEpisode } from '../lib/RandomEpisode';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import { SeasonsDropdown } from '../lib/SeasonsDropdown';
import {
  getAllTitles,
  getAllEpisodes,
  createWatchHistory,
} from '../../utils/services';

export const Series = () => {
  const { series } = useParams();
  const seriesTitle = titleUpperCase(series);
  let history = useHistory();

  // TODO :: rethink this loading page state
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    getAllEpisodes(series)
      .then((res) => {
        setAllEpisodes(res);
        setLoadingPage(false);
      })
      .catch((err) => {
        console.log('ERROR::', err);
        if (err.message === 'Request failed with status code 404') {
          history.push('/404');
        }
      });

    getAllTitles().then((res) => {
      for (let x = 0; x < res.length; x++) {
        if (res[x].title === series) {
          setSeriesInfo(res[x]);
          if (!currentSeason) {
            setCurrentSeason(res[x].seasons[0]);
            localStorage.setItem(`${series}_SEASON`, res[x].seasons[0]);
          }

          createWatchHistory(res[x]);

          break;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, history]);

  const [allEpisodes, setAllEpisodes] = useState([]);
  const [seriesInfo, setSeriesInfo] = useState({});
  const [currentSeason, setCurrentSeason] = useState(
    localStorage.getItem(`${series}_SEASON`) || ''
  );

  const seasonEpisodes = (season) => {
    let currentSeasonEpisodes = [];
    for (let x = 0; x < allEpisodes.length; x++) {
      if (allEpisodes[x].season === season) {
        currentSeasonEpisodes.push(allEpisodes[x]);
        continue;
      }
    }
    return currentSeasonEpisodes;
  };

  const setSeason = (season) => {
    setCurrentSeason(season);
    localStorage.setItem(`${series}_SEASON`, season);
  };

  return (
    <div className="App">
      {loadingPage ? (
        <LoadingSpinner />
      ) : (
        <>
          <br />
          <div className="container">
            <div className="back-button">
              {seriesInfo.seasons && seriesInfo.seasons[0] !== 'N/A' ? (
                <SeasonsDropdown
                  currentSeason={currentSeason}
                  seasons={seriesInfo.seasons}
                  setSeason={setSeason}
                />
              ) : (
                <div />
              )}
            </div>
            <RandomEpisode series={series} allEpisodes={allEpisodes} />
          </div>
          <br />

          <h1>{seriesTitle}</h1>
          {seriesInfo.seasons && seriesInfo.seasons[0] !== 'N/A' ? (
            <h5> Season: {currentSeason}</h5>
          ) : (
            <></>
          )}

          <hr />

          <EpisodeLayout
            episodes={seasonEpisodes(currentSeason)}
            series={series}
          />
        </>
      )}
    </div>
  );
};
