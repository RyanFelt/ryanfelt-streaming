import React from 'react';
import { titleUpperCase, setNotificationMessage } from 'utils/common';
import './index.css';
import { createWatchList, deleteWatchList } from 'utils/services';

export const TitleTile = ({
  titleId,
  title,
  image,
  type,
  videoFile,
  watchedPercentage,
  watchList,
}) => {
  const href = type === 'SERIES' ? `/series/${title}` : `/watch?${videoFile}`;

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

      <a href={href}>
        <img
          width="100%"
          src={`${process.env.REACT_APP_BACKEND_URL}/images/${image}`}
          alt={title}
        />

        <div className="image-text">
          <b className="tile-font">{titleUpperCase(title)}</b>
        </div>

        <div
          className="watched-bar"
          style={{
            width: `${watchedPercentage || 0}%`,
          }}
        />
      </a>
    </div>
  );
};
