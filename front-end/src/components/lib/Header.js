import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../../css/App.css";

export const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Ryan Felt</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/?filter=series">TV Shows</Nav.Link>
          <Nav.Link href="/?filter=movies">Movies</Nav.Link>
          <Nav.Link href="/search">Search</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
