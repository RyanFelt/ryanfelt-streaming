import React from "react";
import { titleUpperCase } from "../../utils/titleUpperCase";

export const FilmTile = ({ path, image, type, videoFile }) => {
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
