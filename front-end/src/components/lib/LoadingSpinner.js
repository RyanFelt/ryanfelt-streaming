import React from "react";
import "../../css/App.css";
import { Spinner } from "react-bootstrap";

export const LoadingSpinner = () => {
  return (
    <div className="full-page">
      <div className="center-of-page">
        <Spinner animation="border" />
      </div>
    </div>
  );
};
