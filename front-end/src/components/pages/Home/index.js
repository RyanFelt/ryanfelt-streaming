import React, { useState, useEffect } from 'react';
import 'App.css';
import './index.css';
import { useLocation } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import { Spinner } from 'react-bootstrap';
import qs from 'query-string';
import { ToastContainer } from 'react-toastify';
import { LoadingSpinner } from 'components/lib/LoadingSpinner';
import { TitleTile } from 'components/lib/TitleTile';
import { getAllTitles, getWatchList } from 'utils/services';

export const Home = () => {
  const { search } = useLocation();
  const { filter } = qs.parse(search);

  const [titles, setTitles] = useState([]);
  const [visibleTitles, setVisibleTitles] = useState([]);
  const [numVisibleTitles, setNumVisibleTitles] = useState(0);
  const [emptyWatchList, setEmptyWatchList] = useState(false);

  useEffect(() => {
    if (!visibleTitles.length) {
      if (filter === 'watchlist') {
        getWatchList().then((res) => {
          if (!res.length) setEmptyWatchList(true);
          setTitleData(res);
        });
      } else {
        getAllTitles().then((res) => {
          setTitleData(res);
        });
      }
    }
  }, []);

  const setTitleData = (titlesData) => {
    if (filter === 'series' || filter === 'movies') {
      titlesData = titlesData.filter((item) => {
        return filter === item.type.toLowerCase();
      });
    } else if (filter && filter !== 'watchlist') {
      titlesData = titlesData.filter((item) =>
        item.genres.map((x) => x.toLowerCase()).includes(filter)
      );
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
  };

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
      <ToastContainer />

      {visibleTitles.length || emptyWatchList ? (
        emptyWatchList ? (
          <>
            <br />
            <br />
            <div>Your watch list is empty...</div>
          </>
        ) : (
          <InfiniteScroll
            loadMore={loadMoreTitles}
            hasMore={visibleTitles.length !== titles.length}
            loader={<Spinner animation="border" />}
            threshold={50}
          >
            <div className="flex-column">
              {filter ? (
                <div className="flex-row-filter-title">
                  <div className="filter-title-text">
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </div>
                </div>
              ) : (
                <></>
              )}

              {visibleTitles.map((title) => {
                return (
                  <TitleTile
                    titleId={title.id}
                    title={title.title}
                    image={title.banner_image}
                    type={title.type}
                    videoFile={title.video_file}
                    watchedPercentage={title.watched_percentage}
                    watchList={filter === 'watchlist'}
                    key={title.id}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        )
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
