import React, { useState, useContext } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { AccountContext } from "./Accounts";

export default () => {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = event => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        const attributes = [
          new CognitoUserAttribute({ Name: "email", Value: newEmail })
        ];

        user.updateAttributes(attributes, (err, results) => {
          if (err) console.error(err);
          console.log(results);
        });
      });
    });
  };

  return (
    <div>
      
      <p>Password must have 8 characters, lowercase, uppercase, and a specific symbol</p>

      <form onSubmit={onSubmit}>
        <input
          type="newEmail"
          value={newEmail}
          onChange={event => setNewEmail(event.target.value)}
          placeholder="New Email"
        />

        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Password"
        />

        <button type="submit">Change email</button>
      </form>
    </div>
  );
};
