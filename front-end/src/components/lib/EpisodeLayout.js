import React from "react";
import "../../css/App.css";

export const EpisodeLayout = props => {
  const { episodes, film } = props;
  let responseTable = [];

  for (let x = 0; x < episodes.length; x++) {
    responseTable.push(cell(episodes[x], film));
  }

  return <div className="container-vertical">{responseTable}</div>;
};

const cell = (episode, film) => {
  return (
    <div key={episode.videoFile}>
      <a className="cell" href={`/film/${film}/watch?${episode.videoFile}`}>
        <h2>{episode.title}</h2>
        Episode: {episode.episode} <br />
        {episode.description}
      </a>
    </div>
  );
};
