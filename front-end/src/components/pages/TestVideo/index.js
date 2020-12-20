import React from 'react';
import { useLocation } from 'react-router';
import 'App.css';

export const TestVideo = () => {
  const { search } = useLocation();
  const videoFile = search.split('?')[1];

  return (
    <div className="App">
      <video
        className="video"
        src={`${process.env.REACT_APP_BACKEND_URL}/videos/${videoFile}`}
        align="center"
        width="75%"
        controls
        autoPlay
      />
    </div>
  );
};
