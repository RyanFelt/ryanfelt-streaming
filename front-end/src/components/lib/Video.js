import React from "react";
import "../../css/App.css";

export const Video = ({ filmTitle, videoFile }) => {
  return (
    <video
      className="video-player"
      src={`${process.env.REACT_APP_VIDEO_SRC_URL}/${filmTitle.replace(
        /\s/g,
        ""
      )}/${videoFile}`}
      align="center"
      width="75%"
      controls
      autoPlay
    />
  );
};
