import React from "react";
import { Button } from "react-bootstrap";
import "../../css/App.css";

export const RandomEpisode = ({ film, allEpisodes }) => {
  const random = Math.floor(Math.random() * allEpisodes.length);

  return (
    <div className="random-episode">
      <Button
        href={`/film/${film}/watch?${allEpisodes[random].videoFile}`}
        variant="dark"
      >
        Random
      </Button>
    </div>
  );
};
