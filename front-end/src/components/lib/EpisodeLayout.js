import React from 'react';
import '../../App.css';

export const EpisodeLayout = ({ episodes, series }) => {
  return (
    <div className="flex-column">
      {episodes.map((episode) => cell(episode, series))}
    </div>
  );
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
