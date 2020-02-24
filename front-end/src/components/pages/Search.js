import React, { useState, useEffect } from 'react';
import '../../css/App.css';
import axios from 'axios';
import { TitleTile } from '../lib/TitleTile';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export const Search = () => {
  const [search, setSearch] = useState('');
  const [wordsSearched, setWordsSearched] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllTitles`)
      .then(res => {
        const matchedSearches = res.data.filter(data =>
          data.title.includes(wordsSearched.map(word => word.toLowerCase()))
        );

        setResults(matchedSearches);
      })
      .catch(err => {
        console.log('ERROR::', err);
      });
  }, [wordsSearched]);

  const [results, setResults] = useState([]);

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const onSearchSubmit = () => {
    const words = search.split(' ');
    setWordsSearched(words.filter(word => word !== ''));
  };

  return (
    <div className="App">
      <br />
      <div className="flex-row-center">
        <div className="textbox">
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={handleSearchChange}
            />
            <Button variant="dark" onClick={onSearchSubmit}>
              Search
            </Button>
          </InputGroup>
          <sup>Currently you can only search by show or movie title.</sup>
        </div>
      </div>

      <h5>Words searched...</h5>
      <div className="flex-row-center">
        {wordsSearched.map(word => {
          return <div key={word}>{word}...</div>;
        })}
      </div>

      <br />

      {!wordsSearched.length ? (
        <div />
      ) : (
        <>
          <h5>Results... {results.length}</h5>
          {results.map(title => {
            return (
              <TitleTile
                path={title.title}
                image={title.bannerImage}
                imageLocation={title.bannerImageLocation}
                type={title.type}
                videoFile={title.videoFile}
                key={title.id}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
