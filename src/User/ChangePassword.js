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

       <p>Password must have 8 characters, lowercase, uppercase, and a specific symbol</p>

      <form onSubmit={onSubmit}>
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
<<<<<<< Updated upstream
          placeholder="Old Password"
=======
          placeholder="new password"
>>>>>>> Stashed changes
        />

        <input
          type="password"
          value={newPassword}
          onChange={event => setNewPassword(event.target.value)}
<<<<<<< Updated upstream
          placeholder="New Password"
=======
          placeholder="confirm password"
>>>>>>> Stashed changes
        />
       
        <button type="submit">Change password</button>
      </form>
    </div>
  );
};
