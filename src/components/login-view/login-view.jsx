import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import "./login-view.scss";

export default function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username required!");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be 5 or more characters!");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password required!");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 or more characters!");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://my-flix-db-akc.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          alert("Invalid Username or Password was entered!");
        });
    }
  };

  return (
    <Container className="login-container">
      <Card bg="light" text="dark" className="login-card">
        <Card.Header className="text-center" as="h5">
          Login
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group
              className="login-form-group-username"
              controlId="formUsername"
            >
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group
              className="form-group-password"
              controlId="formPassword"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>

            <Button
              className="button-login-view"
              variant="secondary"
              type="submit"
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
