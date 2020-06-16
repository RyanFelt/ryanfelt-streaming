import React from 'react';
import { titleUpperCase } from 'utils/common';
import './index.css';

export const TitleTile = ({
  path,
  image,
  type,
  videoFile,
  watchedPercentage,
}) => {
  let href = `/watch?${videoFile}`;
  if (type === 'SERIES') {
    href = `/series/${path}`;
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
