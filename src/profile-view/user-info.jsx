import React from "react";

function UserInfo({ email, name }) {
  return (
    <>
      <h5>Your Info</h5>
      <p>Username: {name}</p>
      <p>E-mail: {email}</p>
    </>
  );
}

export default UserInfo;
