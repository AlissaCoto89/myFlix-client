import React, { useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Card,
  CardGroup,
  Container,
  Form,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [values, setValues] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must have at least 5 characters");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 4) {
      setPasswordErr("Password must have at least 4 characters");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Please enter valid email address");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://my-flix-db-akc.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login!");
          window.open("/", "_self");
        })
        .catch((response) => {
          console.error(response);
          alert("Unable to register user");
        });
    }
  };

  return (
    <Row className="mt-5">
      <Col md={12}>
        <Form>
          <h1>Registration</h1>
          <p></p>
          <Form.Group controlId="formUsername" className="reg-form-inputs">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword" className="reg-form-inputs">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId="Email" className="reg-form-inputs">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            {values.emailErr && <p>{values.emailErr}</p>}
          </Form.Group>

          <Form.Group controlId="updateBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              onChange={(e) => setBirthday(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <p></p>
          <p>
            Already registered <Link to={"/"}>Sign In</Link> here
          </p>
        </Form>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};
