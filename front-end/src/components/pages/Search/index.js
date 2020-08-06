import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import 'App.css';
import { TitleTile } from 'components/lib/TitleTile';
import { LoadingSpinner } from 'components/lib/LoadingSpinner';
import { getAllTitles } from 'utils/services';
import './index.css';

export const Search = () => {
  const [allTitles, setAllTitles] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [wordsSearched, setWordsSearched] = useState([]);
  useEffect(() => {
    const matchedSearches = allTitles.filter((data) => {
      for (let x = 0; x < wordsSearched.length; x++) {
        if (data.title.includes(wordsSearched[x])) return data;
      }
    });

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
    setWordsSearched(
      words.filter((word) => word !== '').map((word) => word.toLowerCase())
    );
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
                  <TitleTile record={title} watchList={false} key={title.id} />
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
