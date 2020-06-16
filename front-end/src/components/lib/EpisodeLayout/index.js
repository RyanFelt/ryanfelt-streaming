import React from 'react';
import './index.css';

export const EpisodeLayout = ({ episodes, series }) => {
  return (
    <div className="flex-column">
      {episodes.map((episode) => Episode(episode, series))}
    </div>
  );
};

const Episode = (episode, series) => {
  return (
    <div key={episode.video_file}>
      <a
        className="episode-layout"
        href={`/series/${series}/watch?${episode.video_file}`}
      >
        <h2>{episode.title}</h2>
        Episode: {episode.episode} <br />
        {episode.description}
      </a>
    </div>
  );
};
