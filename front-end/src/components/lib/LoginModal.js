import React, { useState } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";
import axios from "axios";
import "../../css/App.css";

export const LoginModal = ({ close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const logInUser = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/identity-service/signIn`,
        {
          email,
          password
        }
      )
      .then(res => {
        localStorage.setItem("authorizationToken", res.data.authorization);
        localStorage.setItem("refreshToken", res.data.refresh);
        window.location.reload(false);
      })
      .catch(err => {
        setError(err.response.data.message);
      });
  };

  return (
    <Modal show={true} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormControl
          type="text"
          placeholder="Email"
          className="mr-sm-2"
          onChange={handleEmailChange}
        />
        <br />
        <FormControl
          type="password"
          placeholder="Password"
          className="mr-sm-2"
          onChange={handlePasswordChange}
        />
        {error ? (
          <div>
            <sup className="error-text">{error}</sup>
          </div>
        ) : (
          <></>
        )}
        <br />
        <Button variant="dark" onClick={logInUser}>
          LOG IN
        </Button>
      </Modal.Body>
    </Modal>
  );
};
