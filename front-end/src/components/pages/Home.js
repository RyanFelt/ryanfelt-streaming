import React, { useState, useEffect } from "react";
import "../../css/App.css";
import axios from "axios";
import { LoadingSpinner } from "../lib/LoadingSpinner";

export const Home = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/getAllTitles").then(res => {
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
      <img height="50%" width="100%" src={`/images/${image}`} alt={path} />
    </a>
  );
};
