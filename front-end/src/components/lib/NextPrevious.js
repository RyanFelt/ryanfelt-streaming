import React from "react";

export const NextPrevious = ({ film, episodeIndex, direction }) => {
  return (
    <>
      <a href={`/film/${film}/watch?${episodeIndex}`}>
        <img
          height="100%"
          width="100%"
          src={`/${direction}_arrow.png`}
          alt={"previous_episode"}
        />
      </a>
    </>
  );
};
