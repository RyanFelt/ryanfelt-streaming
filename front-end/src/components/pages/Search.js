import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import '../../App.css';
import { TitleTile } from '../lib/TitleTile';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import { getAllTitles } from '../../utils/services';

export const Search = () => {
  const [allTitles, setAllTitles] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [wordsSearched, setWordsSearched] = useState([]);
  useEffect(() => {
    const matchedSearches = allTitles.filter((data) =>
      data.title.includes(wordsSearched.map((word) => word.toLowerCase()))
    );

    setResults(matchedSearches);
  }, [wordsSearched]);

  useEffect(() => {
    getAllTitles().then((res) => {
      setAllTitles(res);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const onSearchSubmit = () => {
    const words = search.split(' ');
    setWordsSearched(words.filter((word) => word !== ''));
  };

  return (
    <div className="App">
      {allTitles.length ? (
        <>
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
            {wordsSearched.map((word) => {
              return <div key={word}>{word}...</div>;
            })}
          </div>

          <br />

          {!wordsSearched.length ? (
            <div />
          ) : (
            <>
              <h5>Results... {results.length}</h5>
              {results.map((title) => {
                return (
                  <TitleTile
                    path={title.title}
                    image={title.banner_image}
                    imageLocation={'images'}
                    type={title.type}
                    videoFile={title.video_file}
                    key={title.id}
                  />
                );
              })}
            </>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
