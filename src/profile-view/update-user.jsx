import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>Want to change your info?</h3>
      <label>Username:</label>
      <input
        type="text"
        name="Username"
        defaultValue={user.Username}
        onChange={(e) => handleUpdate(e)}
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        defaultValue={user.Password}
        onChange={(e) => handleUpdate(e)}
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        defaultValue={user.Email}
        onChange={(e) => handleUpdate(e.target.value)}
      />

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateUser;
