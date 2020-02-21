import React from 'react';

export const NextPrevious = ({ series, episodeIndex, direction }) => {
  return (
    <>
      <a href={`/series/${series}/watch?${episodeIndex}`}>
        <img
          height="100%"
          width="100%"
          src={`/${direction}_arrow.png`}
          alt={'previous_episode'}
        />
      </a>
    </>
  );
};
