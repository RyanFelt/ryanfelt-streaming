import React from 'react';
import { Button } from 'react-bootstrap';
import '../../App.css';

export const RandomEpisode = ({ series, allEpisodes }) => {
  const random = Math.floor(Math.random() * allEpisodes.length);

  return (
    <div className="random-episode">
      <Button
        href={`/series/${series}/watch?${allEpisodes[random].videoFile}`}
        variant="dark"
      >
        Random
      </Button>
    </div>
  );
};
