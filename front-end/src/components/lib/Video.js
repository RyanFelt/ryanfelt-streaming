import React from "react";
import axios from "axios";
import "../../css/App.css";

const signedInUser = () => {
  const auth = localStorage.getItem("authorizationToken");
  const refresh = localStorage.getItem("refreshToken");

  if (!auth || !refresh) {
    return false;
  }

  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/subscribed`, {
      headers: { Authorization: auth }
    })
    .then(res => {
      return true;
    })
    .catch(err => {
      if (err.response.status === 401) {
        getNewAuthToken(refresh);
      }
    });
};

const getNewAuthToken = refresh => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/identity-service/refresh`, {
      headers: { Authorization: refresh }
    })
    .then(res => {
      localStorage.setItem("authorizationToken", res.data.authorization);
      return true;
    })
    .catch(err => {
      localStorage.removeItem("authorizationToken");
      localStorage.removeItem("refreshToken");
      window.location.reload(false);
    });
};

export const Video = ({ filmTitle, film }) => {
  const title = filmTitle.replace(/\s/g, "");
  let src = `${process.env.REACT_APP_VIDEO_SRC_URL}/${title}/${film.videoFile}`;

  if (film.videoLocation) {
    src = `${process.env.REACT_APP_BACKEND_URL}/${film.videoLocation}/${film.videoFile}`;
  }

  const signedIn = signedInUser();
  if (!signedIn) {
    alert("Sign in to stream content");
    src = null;
  }

  return <video src={src} align="center" width="75%" controls autoPlay />;
};
