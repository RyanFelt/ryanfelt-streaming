import React, { useState } from 'react';
import 'App.css';
import './index.css';
import { FormControl, Button, Spinner } from 'react-bootstrap';
import { titleDashLowerCase, titleUpperCase } from 'utils/common';
import { createNewTitle } from 'utils/services';

export const AddTitle = () => {
  const [userInput, setUserInput] = useState('');
  const [type, setType] = useState('MOVIES');
  const [title, setTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [videoFile, setVideoFile] = useState('');
  const [year, setYear] = useState('');
  const [seasons, setSeasons] = useState('');
  const [submitButtonSpinner, setSubmitButtonSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const submitForm = async () => {
    setErrorMessage('');
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
      });
    } catch (e) {
      setErrorMessage(e.response.data.message);
    }
    setSubmitButtonSpinner(false);
  };

  return (
    <div className="form-flex-container">
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
        <FormControl
          type="text"
          value={bannerImage}
          placeholder="Banner Image..."
          maxLength="70"
          className="mr-sm-2"
          onChange={handleBannerImageChange}
        />
      </div>

      {type === 'MOVIES' ? (
        <>
          <div className="form-item">
            <h3 className="h6">Video File</h3>
            <FormControl
              type="text"
              value={videoFile}
              placeholder="Video File..."
              maxLength="70"
              className="mr-sm-2"
              onChange={handleVideoFileChange}
            />
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

      <br />

      <div className="error-text">{errorMessage}</div>

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
