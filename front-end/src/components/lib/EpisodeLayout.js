import React from 'react';
import '../../App.css';

export const EpisodeLayout = ({ episodes, series }) => {
  let responseTable = [];

  for (let x = 0; x < episodes.length; x++) {
    responseTable.push(cell(episodes[x], series));
  }

  return <div className="flex-column">{responseTable}</div>;
};

const cell = (episode, series) => {
  return (
    <div key={episode.videoFile}>
      <a className="cell" href={`/series/${series}/watch?${episode.videoFile}`}>
        <h2>{episode.episodeTitle}</h2>
        Episode: {episode.episode} <br />
        {episode.description}
      </a>
    </div>
  );
};
