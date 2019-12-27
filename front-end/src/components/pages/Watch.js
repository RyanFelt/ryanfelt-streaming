import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../../css/App.css";
import { titleUpperCase } from "../../utils/titleUpperCase";
import { RandomEpisode } from "../lib/RandomEpisode";
import { NextPrevious } from "../lib/NextPrevious";
import { Video } from "../lib/Video";
import { LoadingSpinner } from "../lib/LoadingSpinner";

export const Watch = () => {
  const { film } = useParams();
  const filmTitle = titleUpperCase(film);

  const { search } = useLocation();
  const videoFile = search.split("?")[1];

  let history = useHistory();

  const [allEpisodes, setAllEpisodes] = useState([]);
  const [episode, setEpisode] = useState({});
  const [episodeIndex, setEpisodeIndex] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/getAllFilms?film=${film}`)
      .then(res => {
        setAllEpisodes(res.data);
      })
      .catch(err => {
        console.log("ERROR::", err);
      });
  }, []);

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
  }, [allEpisodes]);

  useEffect(() => {
    if (allEpisodes.length && !episode.videoFile) {
      history.push("/404");
    }
  }, [episode]);

  return (
    <div className="App">
      {episode.videoFile ? (
        <div>
          <div className="flex-row-buttons">
            <div className="back-button">
              <Button href={`/film/${film}`} variant="dark">
                Back
              </Button>
            </div>

            {allEpisodes.length ? (
              <RandomEpisode film={film} allEpisodes={allEpisodes} />
            ) : (
              ""
            )}
          </div>

          <h1>{filmTitle}</h1>
          <h5>Season: {episode.season}</h5>
          <h5>Episode: {episode.episode}</h5>

          <div className="flex-row">
            <NextPrevious
              film={film}
              episodeIndex={episodeIndex.previous}
              direction="left"
            />

            <Video filmTitle={filmTitle} videoFile={episode.videoFile} />

            <NextPrevious
              film={film}
              episodeIndex={episodeIndex.next}
              direction="right"
            />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
