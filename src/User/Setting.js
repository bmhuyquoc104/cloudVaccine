import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "./Accounts";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";

export default () => {

  const [loggedIn, setLoggedIn] = useState(false);


  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then(() => {
      setLoggedIn(true);
    });
  }, []);

  return (
    <div>
      {loggedIn && (
        <div>
          <h1>Settings</h1>
          <ChangePassword />
          <ChangeEmail />    
        <div/>
      ), 'Please login.'
        </div>
      )}
    </div>
  );
};
