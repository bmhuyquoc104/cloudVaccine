import React, { useEffect } from "react";
import Amplify from "aws-amplify";
import SignUp from "./Signup";
const App = () => {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cognito</h1>
        <h2>Authentication for Create React App using AWS Cognito</h2>
      </header>
      <SignUp />
    </div>
  );
};
export default App;
