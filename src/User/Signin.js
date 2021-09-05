import React, { useState } from "react";
import { Auth } from "aws-amplify";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    Auth.signIn({username: email,password,})
      .then((user) => {
        setEmail("");
        setPassword("");
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });  
      alert("You have been signed in successfully");
  };
  return (
    <div className="form">
      <h3>Sign In</h3>
      <form>
        <input
        id="sign-in-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        />
        <input
        id="sign-in-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        />
        <button type="submit" onClick={signIn} >
          Sign In
        </button>
      </form>
    </div>
  );
};
export default SignIn;