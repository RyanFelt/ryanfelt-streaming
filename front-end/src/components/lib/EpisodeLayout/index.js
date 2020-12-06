import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';

export const EpisodeLayout = ({ episodes, series }) => {
  return (
    <div className="flex-column">
      {episodes.map((episode) => Episode(episode, series))}
    </div>
  );
};

const Episode = (episode, series) => {
  let history = useHistory();

  return (
    <div className="series-episode-container" key={episode.video_file}>
      <div
        className="episode-layout on-hover-pointer"
        onClick={() =>
          history.push(`/series/${series}/watch?${episode.video_file}`)
        }
      >
        <h2>{episode.title}</h2>
        Episode: {episode.episode} <br />
        {episode.description}
      </div>

      <div
        className="watched-bar-episode"
        style={{
          width: `${episode.watched_percentage || 0}%`,
        }}
      />
    </div>
  );
};
