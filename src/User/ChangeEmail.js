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
          type="email"
          onChange={event => setNewEmail(event.target.value)}
<<<<<<< Updated upstream
          placeholder="New Email"
=======
          placeholder="new email"
>>>>>>> Stashed changes
        />

        <input
          type="password"
          value={password}
          type="password"
          onChange={event => setPassword(event.target.value)}
<<<<<<< Updated upstream
          placeholder="Password"
=======
          placeholder="password"
>>>>>>> Stashed changes
        />

        <button type="submit">Change email</button>
      </form>
    </div>
  );
};
