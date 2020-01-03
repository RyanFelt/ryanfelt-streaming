import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../css/App.css";
import { EpisodeLayout } from "../lib/EpisodeLayout";
import { titleUpperCase } from "../../utils/titleUpperCase";
import { RandomEpisode } from "../lib/RandomEpisode";
import { LoadingSpinner } from "../lib/LoadingSpinner";
import { SeasonsDropdown } from "../lib/SeasonsDropdown";

export const Film = () => {
  const { film } = useParams();
  const filmTitle = titleUpperCase(film);

  let history = useHistory();

  const [allEpisodes, setAllEpisodes] = useState([]);
  const [filmInfo, setFilmInfo] = useState({});
  const [currentSeason, setCurrentSeason] = useState(
    localStorage.getItem(`${film}_SEASON`) || ""
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllFilms?film=${film}`)
      .then(res => {
        setAllEpisodes(res.data);
      })
      .catch(err => {
        console.log("ERROR::", err);
        if (err.message === "Request failed with status code 404") {
          history.push("/404");
        }
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllTitles`)
      .then(res => {
        for (let x = 0; x < res.data.length; x++) {
          if (res.data[x].title === film) {
            setFilmInfo(res.data[x]);
            if (!currentSeason) {
              setCurrentSeason(res.data[x].seasons[0]);
              localStorage.setItem(`${film}_SEASON`, res.data[x].seasons[0]);
            }
            break;
          }
        }
      })
      .catch(err => {
        console.log("ERROR::", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [film, history]);

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
    localStorage.setItem(`${film}_SEASON`, season);
  };

  return (
    <div className="App">
      {allEpisodes.length ? (
        <>
          <br />
          <div className="container">
            <div className="back-button">
              {filmInfo.seasons ? (
                <SeasonsDropdown
                  currentSeason={currentSeason}
                  seasons={filmInfo.seasons}
                  setSeason={setSeason}
                />
              ) : (
                <div />
              )}
            </div>

            {allEpisodes.length ? (
              <RandomEpisode film={film} allEpisodes={allEpisodes} />
            ) : (
              <div />
            )}
          </div>
          <br />

          <h1>{filmTitle}</h1>
          <h5>Season: {currentSeason}</h5>
          <hr />

          <EpisodeLayout episodes={seasonEpisodes(currentSeason)} film={film} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
