import React from 'react';
import { titleUpperCase } from 'utils/common';
import './index.css';
import { createWatchList, deleteWatchList } from 'utils/services';

export const TitleTile = ({
  titleId,
  path,
  image,
  type,
  videoFile,
  watchedPercentage,
  watchList,
}) => {
  const href = type === 'SERIES' ? `/series/${path}` : `/watch?${videoFile}`;

  const onClickPostWatchList = () => {
    createWatchList(titleId);
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
          alt={path}
        />

        <div className="image-text">
          <b className="tile-font">{titleUpperCase(path)}</b>
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
