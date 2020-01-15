import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/App.css";

export const Video = ({ filmTitle, film }) => {
  const [src, setSrc] = useState(null);

  const getNewAuthToken = refresh => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/identity-service/refresh`,
        {
          headers: { Authorization: refresh }
        }
      )
      .then(res => {
        localStorage.setItem("authorizationToken", res.data.authorization);
        signedInUser();
      })
      .catch(err => {
        localStorage.removeItem("authorizationToken");
        localStorage.removeItem("refreshToken");
      });
  };

  const signedInUser = () => {
    const auth = localStorage.getItem("authorizationToken");
    const refresh = localStorage.getItem("refreshToken");

    if (!auth || !refresh) {
      alert("Sign in to stream content");
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/subscribed`, {
        headers: { Authorization: auth }
      })
      .then(res => {
        const title = filmTitle.replace(/\s/g, "");

        let srcURL = `${process.env.REACT_APP_VIDEO_SRC_URL}/${title}/${film.videoFile}`;
        if (film.videoLocation) {
          srcURL = `${process.env.REACT_APP_BACKEND_URL}/${film.videoLocation}/${film.videoFile}`;
        }

        setSrc(srcURL);
      })
      .catch(err => {
        console.log("HERE", err.response);
        if (err.response.status === 401) {
          getNewAuthToken(refresh);
          console.log(401);
          return;
        }
      });
  };

  useEffect(() => {
    signedInUser();
  }, []);

  return <video src={src} align="center" width="75%" controls autoPlay />;
};
