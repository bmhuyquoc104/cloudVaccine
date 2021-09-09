import React, { useState } from "react";
// import { Auth } from "aws-amplify";

import SendIcon from '@material-ui/icons/Send';

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardActionArea
} from '@material-ui/core';


import Form from 'react-bootstrap/Form';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");
  // const signUp = (e) => {
  //   e.preventDefault();
  //   Auth.signUp({ username: email, password, attributes: { email } })
  //     .then((data) => {
  //       console.log(data);
  //       setWaitingForCode(true);
  //       setPassword("");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const confirmSignUp = (e) => {
  //   e.preventDefault();
  //   Auth.confirmSignUp(email, code)
  //     .then((data) => {
  //       console.log(data);
  //       setWaitingForCode(false);
  //       setEmail("");
  //       setCode("");
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const resendCode = () => {
  //   Auth.resendSignUp(email)
  //     .then(() => {
  //       console.log("code resent successfully");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  return (
    <div className="form">
      <Typography variant="body1" style={{ fontFamily: 'cursive' }}>
        Please fill in this form to create an account
        {' '}
      </Typography>

      {!waitingForCode && (
        <form>
          {/* <input
            id="sign-up-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          /> */}

          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="Your email"
            onChange={event => setEmail(event.target.value)}
            type="email"
            placeholder='YourEmail@mail.com'
            value={email}
            variant="outlined"
          />
{/* 
          <input
            id="sign-up-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          /> */}

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="Your password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='Enter your password'
            value={password}
            variant="outlined"
          />

          {/* <button type="submit" onClick={signUp}> */}
          {/* <button type="submit">
            Sign Up
          </button> */}
          <Box sx={{ py: 2 }}>
          <Button
            //className={classes.bot}
            fullWidth
            color="secondary"
            style={{fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #20BF55 30%, #01BAEF 90%)', border: 0}}
            // style={{ fontFamily: 'cursive',fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
            align="center"
            size="large"
            type="submit"
            variant="contained"
          >
            Sign up
          </Button>
        </Box>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox"
                label="I accept the Terms of Use and Privacy Policy"
                required
                feedback="You must agree before submitting."
              />
            </Form.Group>
        </form>
      )}

      {waitingForCode && (
        <form>
          <input
            id="sign-up-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="code"
          />
          {/* <button type="submit" onClick={confirmSignUp}> */}
          <button type="submit">
            Confirm Sign Up
          </button>
          {/* <button type="button" onClick={resendCode}> */}
          <button type="button">
            Resend code
          </button>
        </form>
      )}
    </div>
  );
};
export default SignUp;