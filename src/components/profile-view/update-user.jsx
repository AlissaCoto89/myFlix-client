import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, CardGroup, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { setUser, updateUser, deleteUser } from "../../actions/actions";
import "./profile-view.scss";

function UpdateUser(user) {
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthdayErr] = useState("");
  const currentUser = localStorage.getItem("user");

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username required.");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be 5 or more characters.");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password required.");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 or more characters.");
      isReq = false;
    }
    if (!email) {
      setEmailErr("E-mail required.");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("E-mail must be a valid e-mail address!");
      isReq = false;
    }

    return isReq;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    const token = localStorage.getItem("token");
    console.log(isReq);
    console.log(token);
    console.log(user);
    if (isReq && token !== null && user !== null) {
      axios
        .put(
          `https://my-flix-db-akc.herokuapp.com/users/${currentUser}`,

          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          console.log(data);
          alert("Update successful! Please log in!");
          localStorage.clear();
          window.open("/", "_self");
        })
        .catch((e) => {
          console.error(e);
          alert("Unable to update user info!");
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (
      confirm(
        "Are you sure? This cannot be undone! Click OK to delete account."
      )
    ) {
      axios
        .delete(`https://my-flix-db-akc.herokuapp.com/users/${currentUser}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          alert("Your account has been deleted successfully!");
          localStorage.clear();
          window.open("/", "_self");
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Container className="profile-container">
      <span className="label text-center headline-profile-update">
        <h5>Update User Profile</h5>
      </span>
      <Card.Body>
        <CardGroup>
          <Card bg="light" border="dark" text="dark">
            <Form>
              <Form.Group
                className="profile-form-group-username"
                controlId="formGroupUsername"
              >
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your new username"
                  required
                />
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>
              <Form.Group
                className="profile-form-group-password"
                controlId="formGroupPassword"
              >
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  minLength="6"
                  required
                />
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>
              <Form.Group
                className="profile-form-group-email"
                controlId="formGroupEmail"
              >
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your e-mail address"
                  required
                />
                {emailErr && <p>{emailErr}</p>}
              </Form.Group>
              <Form.Group
                className="profile-form-group-birthday"
                controlId="formGroupBirthday"
              >
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder="Enter your birthday"
                />
                {birthdayErr && <p>{birthdayErr}</p>}
              </Form.Group>
              <Button
                className="button-profile-view-update"
                variant="primary"
                type="submit"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Form>
          </Card>
        </CardGroup>
      </Card.Body>
      <Card.Footer className="text-right">
        <Card bg="light" border="dark" text="dark">
          <span className="label text-center headline-profile-delete">
            <h5>Delete Account</h5>
          </span>
          <Button
            className="button button-profile-view-delete"
            variant="danger"
            type="submit"
            onClick={handleDelete}
          >
            DELETE MyFlix ACCOUNT
          </Button>
        </Card>
      </Card.Footer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  updateUser,
  setUser,
  deleteUser,
})(UpdateUser);
