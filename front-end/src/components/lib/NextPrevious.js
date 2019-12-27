import React from "react";

export const NextPrevious = ({ film, episodeIndex, direction }) => {
  return (
    <div>
      <a href={`/film/${film}/watch?${episodeIndex}`}>
        <img
          height="100%"
          width="100%"
          src={`/images/${direction}_arrow.png`}
          alt={"previous_episode"}
        />
      </a>
    </div>
  );
};
