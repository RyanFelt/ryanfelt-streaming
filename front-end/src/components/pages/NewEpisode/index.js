import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'App.css';
import { getAllTitles, getAllEpisodes } from 'utils/services';

export const NewEpisode = () => {
  const [allTitles, setAllTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState({});

  useEffect(() => {
    getAllTitles().then((res) => {
      setAllTitles(res);
      setSelectedTitle(res[0]);
    });
  }, []);

  return (
    <div className="form-flex-container">
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {selectedTitle.title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {allTitles.map((title) => {
            return (
              <Dropdown.Item key={title.title} onClick={() => {}}>
                {title.title}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
