import React from "react";
import { Container } from "react-bootstrap";

function UserInfo({ email, name }) {
  return (
    <Container className="user-container">
      <span className="label text-center headline-user-info">
        <h5>User Info</h5>{" "}
      </span>
      <p>Username: {name}</p>
      <p>E-mail: {email}</p>
    </Container>
  );
}

export default UserInfo;
