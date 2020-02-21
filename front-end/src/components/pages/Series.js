import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../../css/App.css';
import { EpisodeLayout } from '../lib/EpisodeLayout';
import { titleUpperCase } from '../../utils/titleUpperCase';
import { RandomEpisode } from '../lib/RandomEpisode';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import { SeasonsDropdown } from '../lib/SeasonsDropdown';

export const Series = () => {
  const { series } = useParams();
  const seriesTitle = titleUpperCase(series);
  let history = useHistory();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/getAllEpisodes?title=${series}`
      )
      .then(res => {
        setAllEpisodes(res.data);
      })
      .catch(err => {
        console.log('ERROR::', err);
        if (err.message === 'Request failed with status code 404') {
          history.push('/404');
        }
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllTitles`)
      .then(res => {
        for (let x = 0; x < res.data.length; x++) {
          if (res.data[x].title === series) {
            setSeriesInfo(res.data[x]);
            if (!currentSeason) {
              setCurrentSeason(res.data[x].seasons[0]);
              localStorage.setItem(`${series}_SEASON`, res.data[x].seasons[0]);
            }
            break;
          }
        }
      })
      .catch(err => {
        console.log('ERROR::', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, history]);

  const [allEpisodes, setAllEpisodes] = useState([]);
  const [seriesInfo, setSeriesInfo] = useState({});
  const [currentSeason, setCurrentSeason] = useState(
    localStorage.getItem(`${series}_SEASON`) || ''
  );

  const seasonEpisodes = season => {
    let currentSeasonEpisodes = [];
    for (let x = 0; x < allEpisodes.length; x++) {
      if (allEpisodes[x].season === season) {
        currentSeasonEpisodes.push(allEpisodes[x]);
        continue;
      }
    }
    return currentSeasonEpisodes;
  };

  const setSeason = season => {
    setCurrentSeason(season);
    localStorage.setItem(`${series}_SEASON`, season);
  };

  return (
    <div className="App">
      {allEpisodes.length ? (
        <>
          <br />
          <div className="container">
            <div className="back-button">
              {seriesInfo.seasons ? (
                <SeasonsDropdown
                  currentSeason={currentSeason}
                  seasons={seriesInfo.seasons}
                  setSeason={setSeason}
                />
              ) : (
                <div />
              )}
            </div>

            {allEpisodes.length ? (
              <RandomEpisode series={series} allEpisodes={allEpisodes} />
            ) : (
              <div />
            )}
          </div>
          <br />

          <h1>{seriesTitle}</h1>
          <h5>Season: {currentSeason}</h5>
          <hr />

          <EpisodeLayout
            episodes={seasonEpisodes(currentSeason)}
            series={series}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
