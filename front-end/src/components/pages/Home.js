import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useLocation } from 'react-router';
import qs from 'query-string';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import { TitleTile } from '../lib/TitleTile';
import { getAllTitles } from '../../utils/services';

export const Home = () => {
  const { search } = useLocation();
  const { filter } = qs.parse(search);

  const [titles, setTitles] = useState([]);

  useEffect(() => {
    if (!titles.length) {
      getAllTitles().then(res => {
        let titlesData = res;

        if (filter) {
          titlesData = res.filter(item => {
            return filter === item.type.toLowerCase();
          });
        }
        setTitles(titlesData);
      });
    }
  }, [titles]);

  return (
    <div className="App">
      {titles && titles.length ? (
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
