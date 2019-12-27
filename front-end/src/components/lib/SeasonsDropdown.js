import React from "react";
import { Dropdown } from "react-bootstrap";

export const SeasonsDropdown = ({ currentSeason, seasons, setSeason }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {currentSeason}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {seasons.map(season => {
          return (
            <Dropdown.Item key={season} onClick={() => setSeason(season)}>
              {season}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
