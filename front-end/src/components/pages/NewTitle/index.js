import React, { useState } from 'react';
import 'App.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { FormControl, Button, Spinner } from 'react-bootstrap';
import {
  titleDashLowerCase,
  titleUpperCase,
  setErrorMessage,
} from 'utils/common';
import { createNewTitle, getImdb } from 'utils/services';

export const NewTitle = () => {
  const [userInput, setUserInput] = useState('');
  const [type, setType] = useState('MOVIES');
  const [title, setTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [videoFile, setVideoFile] = useState('');
  const [year, setYear] = useState('');
  const [seasons, setSeasons] = useState('');
  const [genres, setGenres] = useState('');
  const [submitButtonSpinner, setSubmitButtonSpinner] = useState(false);

  const addExtension = (str, extension) => {
    return str.includes(extension) || str.includes('.')
      ? str
      : `${str}${extension}`;
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
    handleTitleChange(event);
    handleBannerImageChange(event);
    handleVideoFileChange(event);
  };

  const handleTitleChange = (event) => {
    setTitle(titleDashLowerCase(event.target.value));
  };

  const handleBannerImageChange = (event) => {
    setBannerImage(
      addExtension(titleDashLowerCase(event.target.value), '.jpg')
    );
  };

  const handleVideoFileChange = (event) => {
    setVideoFile(
      addExtension(
        titleUpperCase(titleDashLowerCase(event.target.value)).replace(
          /\s/g,
          ''
        ),
        '.mp4'
      )
    );
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);

    if (event.target.value === 'MOVIES') {
      setSeasons('');
    } else if (event.target.value === 'SERIES') {
      setVideoFile('');
      setYear('');
    }
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSeasonsChange = (event) => {
    let seasons = event.target.value;

    if (seasons.slice(-1) !== ',') {
      seasons = seasons
        .split(',')
        .filter(Boolean)
        .map((u) => u.trim())
        .toString();
    }

    setSeasons(seasons);
  };

  const handleGenresChange = (event) => {
    let genres = event.target.value;

    if (genres.slice(-1) !== ',') {
      genres = genres
        .split(',')
        .filter(Boolean)
        .map((u) => u.trim())
        .toString();
    }

    setGenres(genres);
  };

  const submitForm = async () => {
    setSubmitButtonSpinner(true);

    const moviesValidation = !title || !bannerImage || !videoFile || !year;
    const seriesValidation = !title || !bannerImage || !seasons;

    if (
      (type === 'MOVIES' && moviesValidation) ||
      (type === 'SERIES' && seriesValidation)
    ) {
      setErrorMessage('All fields required');
      setSubmitButtonSpinner(false);
      return;
    }

    try {
      await createNewTitle({
        type,
        title,
        bannerImage,
        videoFile,
        year,
        seasons: seasons.split(','),
        genres: genres.split(','),
      });
    } catch (e) {
      setErrorMessage(
        `ERROR - ${e.response.status} - ${e.response.data.message}`
      );
    }
    setSubmitButtonSpinner(false);
  };

  const getBannerImage = () => {
    window.open(
      encodeURI(`https://wall.alphacoders.com/search.php?search=${userInput}`),
      '_blank'
    );
  };

  const getVideoFile = () => {
    window.open(encodeURI(`https://katcr.to/usearch/${userInput}`), '_blank');
  };

  const getGenres = async () => {
    const data = await getImdb(userInput);
    setGenres(data.Genre);
  };

  return (
    <div className="form-flex-container">
      <ToastContainer />

      <h1>Add New Title</h1>
      <br />

      <div className="form-item-small">
        <h3 className="h6">Type</h3>
        <FormControl as="select" onChange={handleTypeChange}>
          <option value="MOVIES" key="MOVIES">
            MOVIES
          </option>
          <option value="SERIES" key="SERIES">
            SERIES
          </option>
        </FormControl>
      </div>

      <div className="form-item">
        <h3 className="h6">New Title</h3>
        <FormControl
          type="text"
          value={userInput}
          placeholder="Add new title..."
          maxLength="70"
          className="mr-sm-2"
          onChange={handleUserInputChange}
        />
      </div>

      <br />
      <h2 className="h4">New Record</h2>

      <div className="form-item">
        <h3 className="h6">Title</h3>
        <FormControl
          type="text"
          value={title}
          placeholder="Title..."
          maxLength="70"
          className="mr-sm-2"
          onChange={handleTitleChange}
        />
      </div>

      <div className="form-item">
        <h3 className="h6">Banner Image</h3>

        <div className="d-flex">
          <FormControl
            type="text"
            value={bannerImage}
            placeholder="Banner Image..."
            maxLength="70"
            className="mr-sm-2"
            onChange={handleBannerImageChange}
          />
          <Button variant="dark" onClick={getBannerImage}>
            Get
          </Button>
        </div>
      </div>

      {type === 'MOVIES' ? (
        <>
          <div className="form-item">
            <h3 className="h6">Video File</h3>

            <div className="d-flex">
              <FormControl
                type="text"
                value={videoFile}
                placeholder="Video File..."
                maxLength="70"
                className="mr-sm-2"
                onChange={handleVideoFileChange}
              />
              <Button variant="dark" onClick={getVideoFile}>
                Get
              </Button>
            </div>
          </div>

          <div className="form-item-small">
            <h3 className="h6">Year</h3>
            <FormControl
              type="text"
              value={year}
              placeholder="Year..."
              maxLength="4"
              className="mr-sm-2"
              onChange={handleYearChange}
            />
          </div>
        </>
      ) : (
        <div className="form-item">
          <h3 className="h6">Seasons (Comma seperated)</h3>
          <FormControl
            type="text"
            value={seasons}
            placeholder="Seasons..."
            maxLength="70"
            className="mr-sm-2"
            onChange={handleSeasonsChange}
          />
        </div>
      )}

      <div className="form-item">
        <h3 className="h6">Genres (Comma seperated)</h3>
        <div className="d-flex">
          <FormControl
            type="text"
            value={genres}
            placeholder="Seasons..."
            maxLength="70"
            className="mr-sm-2"
            onChange={handleGenresChange}
          />

          <Button variant="dark" onClick={getGenres}>
            Get
          </Button>
        </div>
      </div>

      <br />

      <Button variant="dark" onClick={submitForm}>
        {submitButtonSpinner ? (
          <Spinner animation="border" size="sm" />
        ) : (
          'Submit'
        )}
      </Button>
    </div>
  );
};
