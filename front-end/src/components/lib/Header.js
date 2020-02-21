import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LoginModal } from './LoginModal';
import { LogOut } from './LogOut';
import '../../css/App.css';

export const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [signedIn, setSignedIn] = useState(true);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  useEffect(() => {
    const auth = localStorage.getItem('authorizationToken');
    const refresh = localStorage.getItem('refreshToken');

    if (auth && refresh) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [signedIn]);

  return (
    <>
      {showLoginModal ? <LoginModal close={handleCloseLoginModal} /> : ''}

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Ryan Felt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/?filter=series">TV Shows</Nav.Link>
            <Nav.Link href="/?filter=movies">Movies</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>

          <Nav className="mr-right">
            {signedIn ? (
              <Nav.Link className="margin-right" onClick={LogOut}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link className="margin-right" onClick={handleShowLoginModal}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
