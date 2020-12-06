import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './index.css';

export const RandomEpisode = ({ series, allEpisodes }) => {
  let history = useHistory();

  if (!allEpisodes.length) return <></>;

  const random = Math.floor(Math.random() * allEpisodes.length);

  return (
    <div className="random-episode">
      <Button
        onClick={() =>
          history.push(
            `/series/${series}/watch?${allEpisodes[random].video_file}`
          )
        }
        variant="dark"
      >
        Random
      </Button>
    </div>
  );
};
