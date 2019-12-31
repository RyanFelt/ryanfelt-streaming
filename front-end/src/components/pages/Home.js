import React, { useState, useEffect } from "react";
import "../../css/App.css";
import { useLocation } from "react-router";
import axios from "axios";
import qs from "query-string";
import { LoadingSpinner } from "../lib/LoadingSpinner";
import { titleUpperCase } from "../../utils/titleUpperCase";

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
        <div>
          {films.map(item => {
            return (
              <DisplayImage
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

const DisplayImage = ({ path, image, type, videoFile }) => {
  let href = `/watch?${videoFile}`;
  if (type === "SERIES") {
    href = `/film/${path}`;
  }

  return (
    <div className="image-container">
      <a href={href}>
        <img
          width="100%"
          src={`${process.env.REACT_APP_BACKEND_URL}/images/${image}`}
          alt={path}
        />
        <div className="image-text">
          <h4>{titleUpperCase(path)}</h4>
        </div>
      </a>
    </div>
  );
};
