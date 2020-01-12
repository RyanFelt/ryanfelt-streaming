import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LoginModal } from "./LoginModal";
import "../../css/App.css";

export const Header = () => {
  const [show, setShow] = useState(false);
  const [signedIn, setSignedIn] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const auth = localStorage.getItem("authorizationToken");
    const refresh = localStorage.getItem("refreshToken");

    if (auth && refresh) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [signedIn]);

  return (
    <>
      {show ? <LoginModal close={handleClose} /> : ""}

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Ryan Felt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/?filter=series">TV Shows</Nav.Link>
            <Nav.Link href="/?filter=movies">Movies</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
          {signedIn ? (
            ""
          ) : (
            <Nav className="mr-right">
              <Nav.Link className="margin-right" onClick={handleShow}>
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
