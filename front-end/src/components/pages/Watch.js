import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../../css/App.css";
import { titleUpperCase } from "../../utils/titleUpperCase";
import { Video } from "../lib/Video";
import { LoadingSpinner } from "../lib/LoadingSpinner";

export const Watch = () => {
  const { search } = useLocation();
  const videoFile = search.split("?")[1];

  const [filmInfo, setFilmInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllTitles`)
      .then(res => {
        for (let x = 0; x < res.data.length; x++) {
          if (res.data[x].videoFile === videoFile) {
            setFilmInfo(res.data[x]);
            break;
          }
        }
      })
      .catch(err => {
        console.log("ERROR::", err);
      });
  }, [videoFile]);

  return (
    <div className="App">
      {filmInfo.videoFile ? (
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
          <h1>{titleUpperCase(filmInfo.title)}</h1>
          <h5>{filmInfo.year} </h5>

          <Video filmTitle={"movies"} film={filmInfo} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
