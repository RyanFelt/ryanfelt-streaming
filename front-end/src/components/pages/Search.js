import React, { useState, useEffect } from "react";
import "../../css/App.css";
import axios from "axios";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { titleUpperCase } from "../../utils/titleUpperCase";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [wordsSearched, setWordsSearched] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllTitles`)
      .then(res => {
        let matchedSearches = [];
        for (let x = 0; x < res.data.length; x++) {
          for (let i = 0; i < wordsSearched.length; i++) {
            if (res.data[x].title.includes(wordsSearched[i].toLowerCase())) {
              matchedSearches.push(res.data[x]);
              break;
            }
          }
        }
        setResults(matchedSearches);
      })
      .catch(err => {
        console.log("ERROR::", err);
      });
  }, [wordsSearched]);

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const onSearchSubmit = () => {
    const words = search.split(" ");
    setWordsSearched(words.filter(word => word !== ""));
  };

  return (
    <div className="App">
      <br />
      <div className="flex-row">
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
      <div className="flex-row">
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

          {results.map(film => {
            return <div key={film.title}>{titleUpperCase(film.title)}</div>;
          })}
        </>
      )}
    </div>
  );
};
