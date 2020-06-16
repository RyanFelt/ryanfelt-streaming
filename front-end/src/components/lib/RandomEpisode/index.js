import React from 'react';
import { Button } from 'react-bootstrap';
import './index.css';

export const RandomEpisode = ({ series, allEpisodes }) => {
  if (!allEpisodes.length) return <></>;

  const random = Math.floor(Math.random() * allEpisodes.length);

  return (
    <div className="random-episode">
      <Button
        href={`/series/${series}/watch?${allEpisodes[random].video_file}`}
        variant="dark"
      >
        Random
      </Button>
    </div>
  );
};