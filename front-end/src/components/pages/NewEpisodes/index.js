import React, { useEffect, useState } from 'react';
import 'App.css';
import '../NewTitle/index.css';
import { ToastContainer } from 'react-toastify';
import { Dropdown, Button, Spinner } from 'react-bootstrap';
import { titleUpperCase, setErrorMessage } from 'utils/common';
import { getAllTitles, getImdb, createNewEpisode } from 'utils/services';

export const NewEpisodes = () => {
  const [allTitles, setAllTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState({});
  const [episodesJson, setEpisodesJson] = useState([]);
  const [submitButtonSpinner, setSubmitButtonSpinner] = useState(false);

  useEffect(() => {
    getAllTitles().then((res) => {
      setAllTitles(
        res.filter((title) => title.type === 'SERIES' && title.seasons)
      );
      setSelectedTitle(res[0]);
    });
  }, []);

  const handleEpisodesJsonChange = (event) => {
    setEpisodesJson(JSON.parse(event.target.value));
  };

  const getEpisodesData = async ({ title, seasons, id }) => {
    let allEpisodes = [];

    for (let x = 0; x < seasons.length; x++) {
      const seasonData = await getImdb(title, seasons[x]);

      if (!seasonData && !seasonData.length) return;

      for (let i = 0; i < seasonData.Episodes.length; i++) {
        const ep = seasonData.Episodes[i];

        const videoFile = `${titleUpperCase(title).replace(/\s/g, '')}-S${
          seasons[x].length === 2 ? seasons[x] : 0 + seasons[x]
        }E${ep.Episode.length === 2 ? ep.Episode : 0 + ep.Episode}.mp4`;

        const episodeData = await getImdb(title, seasons[x], ep.Episode);

        const episode = {
          title: ep.Title,
          videoFile,
          season: seasons[x],
          episode: ep.Episode,
          description: episodeData.Plot || '',
          parentId: id,
        };

        allEpisodes.push(episode);
      }
    }

    setEpisodesJson(allEpisodes);
  };

  const submitForm = async () => {
    setSubmitButtonSpinner(true);

    let erroredEpisodes = [];

    for (let x = 0; x < episodesJson.length; x++) {
      try {
        await createNewEpisode(episodesJson[x]);
      } catch (err) {
        const errMessage = `ERROR -- ${episodesJson[x].videoFile} -- ${err}`;
        setErrorMessage(errMessage);

        erroredEpisodes.push(episodesJson[x]);
      }
    }

    setEpisodesJson(erroredEpisodes);
    setSubmitButtonSpinner(false);
  };

  return (
    <div className="form-flex-container">
      <br />
      <ToastContainer />

      <div className="flex-row form-item">
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            {selectedTitle.title}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {allTitles.map((title) => {
              return (
                <Dropdown.Item
                  key={title.title}
                  onClick={() => {
                    setSelectedTitle(title);
                    getEpisodesData(title);
                  }}
                >
                  {title.title}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="dark" onClick={submitForm}>
          {submitButtonSpinner ? (
            <Spinner animation="border" size="sm" />
          ) : (
            'Submit'
          )}
        </Button>
      </div>
      <br />

      <textarea
        value={JSON.stringify(episodesJson, undefined, 4)}
        rows="25"
        cols="150"
        onChange={handleEpisodesJsonChange}
      />
    </div>
  );
};
