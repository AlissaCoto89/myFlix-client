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
    <>
      <h4>Update User Profile</h4>

      <Form>
        <Form.Group>
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

        <Form.Group>
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
        <Form.Group>
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

        <Button
          className="mt-2"
          variant="info"
          type="submit"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Form>
    </>
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
