import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  CardGroup,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./login-view.scss";

export function LoginView(props) {
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
    <Container style={{ width: 600 }}>
      <Row>
        <Col>
          <CardGroup>
            <Card
              style={{ marginTop: 100, marginBottom: 350 }}
              className="logIn"
            >
              <Card.Body>
                <Card.Title style={{ textAlign: "center", fontSize: "2rem" }}>
                  Login
                </Card.Title>
                <Form className="login-form">
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter a password"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Button variant="info" type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>
                    <Link to="/register" className="ml-2 registerLink">
                      Register
                    </Link>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (event) => dispatch(handleSubmit(event)),
});

export default connect(null, mapDispatchToProps)(LoginView);
