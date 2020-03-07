import React from 'react';
import { titleUpperCase } from '../../utils/common';

export const TitleTile = ({ path, image, imageLocation, type, videoFile }) => {
  let href = `/watch?${videoFile}`;
  if (type === 'SERIES') {
    href = `/series/${path}`;
  }

  return (
    <div className="image-container">
      <a href={href}>
        <img
          width="100%"
          src={`${process.env.REACT_APP_BACKEND_URL}/${imageLocation}/${image}`}
          alt={path}
        />
        <div className="image-text">
          <h4>{titleUpperCase(path)}</h4>
        </div>
      </a>
    </div>
  );
};
