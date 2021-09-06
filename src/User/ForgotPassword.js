import React, { useState, useContext } from "react";
import { AccountContext } from "./Accounts";

export default () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = event => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        user.changePassword(password, newPassword, (err, result) => {
          if (err) console.error(err);
          console.log(result);
        });
      });
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="New Password"
        />

        <input
          type="password"
          value={newPassword}
          onChange={event => setNewPassword(event.target.value)}
          placeholder="Confirm Password"
        />
        <p>Password must have 8 characters, lowercase, uppercase, specific character.</p>
        <button type="submit">Change password</button>
      </form>
    </div>
  );
};
