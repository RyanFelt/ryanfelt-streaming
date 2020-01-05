import React from "react";
import "../../css/App.css";

export const Video = ({ filmTitle, film }) => {
  const title = filmTitle.replace(/\s/g, "");
  let src = `${process.env.REACT_APP_VIDEO_SRC_URL}/${title}/${film.videoFile}`;

  if (film.videoLocation) {
    src = `${process.env.REACT_APP_BACKEND_URL}/${film.videoLocation}/${film.videoFile}`;
  }

  return (
    <video
      className="video-player"
      src={src}
      align="center"
      width="75%"
      controls
      autoPlay
    />
  );
};
