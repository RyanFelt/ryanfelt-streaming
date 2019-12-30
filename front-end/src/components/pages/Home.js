import React, { useState, useEffect } from "react";
import "../../css/App.css";
import axios from "axios";
import { LoadingSpinner } from "../lib/LoadingSpinner";

export const Home = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllTitles`)
      .then(res => {
        setFilms(res.data);
      });
  }, []);

  return (
    <div className="App">
      {films.length ? (
        <div>
          {films.map(show => {
            return (
              <DisplayImage
                path={show.title}
                image={show.bannerImage}
                key={show.id}
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

const DisplayImage = ({ path, image }) => {
  return (
    <a href={`/film/${path}`}>
      <img
        height="50%"
        width="100%"
        src={`${process.env.REACT_APP_BACKEND_URL}/images/${image}`}
        alt={path}
      />
    </a>
  );
};
