import React from "react";
import { Container } from "react-bootstrap";

function UserInfo({ email, name }) {
  return (
    <Container className="user-container">
      <div className="label headline-user-info">
        <h4>User Info</h4>
      </div>
      <p>Username: {name}</p>
      <p>E-mail: {email}</p>
    </Container>
  );
}

export default UserInfo;
