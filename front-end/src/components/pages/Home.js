import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useLocation } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import { Spinner } from 'react-bootstrap';
import qs from 'query-string';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import { TitleTile } from '../lib/TitleTile';
import { getAllTitles } from '../../utils/services';

export const Home = () => {
  const { search } = useLocation();
  const { filter } = qs.parse(search);

  const [titles, setTitles] = useState([]);
  const [visibleTitles, setVisibleTitles] = useState([]);
  const [numVisibleTitles, setNumVisibleTitles] = useState(0);

  useEffect(() => {
    if (!visibleTitles.length) {
      getAllTitles().then((res) => {
        let titlesData = res;

        if (filter) {
          titlesData = res.filter((item) => {
            return filter === item.type.toLowerCase();
          });
        }

        const latestNumVisibleTitles =
          titlesData.length > 5 ? 5 : titlesData.length;
        setNumVisibleTitles(latestNumVisibleTitles);

        setTitles(titlesData);

        let titlesToAdd = [];
        for (let x = 0; x < latestNumVisibleTitles; x++) {
          titlesToAdd.push(titlesData[x]);
        }
        setVisibleTitles(titlesToAdd);
      });
    }
  }, []);

  const loadMoreTitles = () => {
    const maxNumVisibleTitles =
      titles.length > numVisibleTitles + 5
        ? numVisibleTitles + 5
        : titles.length;

    let addTitles = [];
    for (let x = numVisibleTitles; x < maxNumVisibleTitles; x++) {
      addTitles.push(titles[x]);
    }

    setVisibleTitles([...visibleTitles, ...addTitles]);
    setNumVisibleTitles(numVisibleTitles + 5);
  };

  return (
    <div className="App">
      {visibleTitles.length ? (
        <InfiniteScroll
          loadMore={loadMoreTitles}
          hasMore={visibleTitles.length !== titles.length}
          loader={<Spinner animation="border" />}
          threshold={50}
        >
          <div className="flex-column">
            {visibleTitles.map((title) => {
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
        </InfiniteScroll>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
