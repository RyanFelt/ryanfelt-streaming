import React, { useState, useEffect } from "react";
import "../../css/App.css";
import { useLocation } from "react-router";
import axios from "axios";
import qs from "query-string";
import { LoadingSpinner } from "../lib/LoadingSpinner";
import { FilmTile } from "../lib/FilmTile";

export const Home = () => {
  const { search } = useLocation();
  const { filter } = qs.parse(search);

  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllTitles`)
      .then(res => {
        let filmsData = JSON.parse(JSON.stringify(res.data));

        if (filter) {
          filmsData = res.data.filter(item => {
            return filter === item.type.toLowerCase();
          });
        }
        setFilms(filmsData);
      });
  }, [filter]);

  return (
    <div className="App">
      {films.length ? (
        <div className="flex-column">
          {films.map(item => {
            return (
              <FilmTile
                path={item.title}
                image={item.bannerImage}
                type={item.type}
                videoFile={item.videoFile}
                key={item.id}
              />
            );
          })}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
