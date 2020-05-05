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
    <div key={episode.video_file}>
      <a
        className="cell"
        href={`/series/${series}/watch?${episode.video_file}`}
      >
        <h2>{episode.title}</h2>
        Episode: {episode.episode} <br />
        {episode.description}
      </a>
    </div>
  );
};
