import React from "react";

function UserInfo({ email, name }) {
  return (
    <>
      <h3>Your Info</h3>
      <p>Name: {name}</p>
      <p>E-mail: {email}</p>
    </>
  );
}

export default UserInfo;
