import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardGroup,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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
      setValues({ ...values, usernameErr: "Username Required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: "Username must be at least 5 characters long.",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password Required" });
      isReq = false;
    } else if (password.length < 4) {
      setValues({
        ...values,
        passwordErr: "Password must be at least 4 characters long",
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: "Email Required" });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Email is invalid" });
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
          alert("Sorry, unable to register user");
        });
    }
  };

  return (
    <Container style={{ width: 600 }}>
      <Row>
        <Col>
          <CardGroup>
            <Card style={{ marginTop: 100, marginBottom: 350 }}>
              <Card.Body>
                <Card.Title style={{ textAlign: "center", fontSize: "2rem" }}>
                  Register
                </Card.Title>
                <Form className="registration-form">
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      name="birthday"
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Button variant="info" type="submit" onClick={handleSubmit}>
                      Register
                    </Button>
                    <p></p>
                    <p>
                      Already registered? <Link to={"/"}>Login here</Link>
                    </p>
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

export default connect(null, mapDispatchToProps)(RegistrationView);
