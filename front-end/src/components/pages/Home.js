import React, { useState, useEffect } from 'react';
import '../../css/App.css';
import { useLocation } from 'react-router';
import axios from 'axios';
import qs from 'query-string';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import { TitleTile } from '../lib/TitleTile';

export const Home = () => {
  const { search } = useLocation();
  const { filter } = qs.parse(search);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllTitles`)
      .then(res => {
        let titlesData = JSON.parse(JSON.stringify(res.data));

        if (filter) {
          titlesData = res.data.filter(item => {
            return filter === item.type.toLowerCase();
          });
        }
        setTitles(titlesData);
      });
  }, [filter]);

  const [titles, setTitles] = useState([]);

  return (
    <div className="App">
      {titles.length ? (
        <div className="flex-column">
          {titles.map(title => {
            return (
              <TitleTile
                path={title.title}
                image={title.bannerImage}
                imageLocation={title.bannerImageLocation}
                type={title.type}
                videoFile={title.videoFile}
                key={title.id}
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
