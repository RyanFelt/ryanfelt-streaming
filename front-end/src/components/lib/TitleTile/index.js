import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { titleUpperCase, setNotificationMessage } from 'utils/common';
import './index.css';
import { createWatchList, deleteWatchList } from 'utils/services';

export const TitleTile = ({ record, watchList }) => {
  const {
    id: titleId,
    title,
    banner_image,
    type,
    video_file,
    watched_percentage,
  } = record;

  let history = useHistory();

  const href = type === 'SERIES' ? `/series/${title}` : `/watch?${video_file}`;

  const [src, setSrc] = useState(
    `${process.env.REACT_APP_BACKEND_URL}/images/na.png`
  );
  const [didLoad, setLoad] = useState(false);
  useEffect(() => {
    setSrc(`${process.env.REACT_APP_BACKEND_URL}/images/${banner_image}`);
  }, [didLoad]);

  const onClickPostWatchList = () => {
    createWatchList(titleId);
    setNotificationMessage(`${titleUpperCase(title)} added to watchlist!`);
  };

  const onClickDeleteWatchList = () => {
    deleteWatchList(titleId);
    window.location.reload(false);
  };

  return (
    <div className="image-container">
      <button
        className="watch-list-button"
        onClick={watchList ? onClickDeleteWatchList : onClickPostWatchList}
        title={watchList ? 'Remove from watch list' : 'Add to watch list'}
      >
        <b className="tile-font">{watchList ? 'x' : '+'}</b>
      </button>

      <div className="on-hover-pointer" onClick={() => history.push(href)}>
        <img width="100%" src={src} alt={title} onLoad={() => setLoad(true)} />

        <div className="image-text">
          <b className="tile-font">{titleUpperCase(title)}</b>
        </div>

        <div
          className="watched-bar"
          style={{
            width: `${watched_percentage || 0}%`,
          }}
        />
      </div>
    </div>
  );
};
