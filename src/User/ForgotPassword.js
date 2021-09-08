import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../UserPool";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  bot:
  {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  icon:
  {
    color: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  info:
  {
    marginTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
  }
}));

export default () => {
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const classes = useStyles();

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool
    });
  };

  const sendCode = event => {
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: data => {
        console.log("onSuccess:", data);
      },
      onFailure: err => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: data => {
        console.log("Input code:", data);
        setStage(2);
      }
    });
  };

  const resetPassword = event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords are not the same");
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: data => {
        console.log("onSuccess:", data);
      },
      onFailure: err => {
        console.error("onFailure:", err);
      }
    });
  };

  return (
    <div>
      {stage === 1 && (
        <form onSubmit={sendCode}>

          {/* // Old input form
          <input
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Your current email"
          /> */}
          <TextField
            fullWidth
            label="Enter your registered email"
            margin="normal"
            name="email"
            onChange={event => setEmail(event.target.value)}
            type="email"
            value={email}
            variant="outlined"
            style={{ fontFamily: 'cursive', fontWeight: 'bold' }}
          />
          {/* //Old button */}
          {/* <button type="submit">Send verification code</button> */}
          <Box sx={{ py: 2 }}>
            <Button
              //className={classes.bot}
              color="secondary" variant="h4" style={{ fontFamily: 'cursive', fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
              // style={{ fontFamily: 'cursive', fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
              size="medium"
              endIcon={<SendIcon />}
              type="submit"
              variant="contained"
            >
              Send verification code
            </Button>
          </Box>
        </form>
      )}

      {stage === 2 && (
        <form onSubmit={resetPassword}>

          {/* // Old input
          <input value={code} onChange={event => setCode(event.target.value)} placeholder="Code" /> */}

          <TextField
            fullWidth
            label="Code"
            margin="normal"
            name="code"
            onChange={event => setCode(event.target.value)}
            type="code"
            value={code}
            placeholder="Verification code"
            variant="outlined"
          />


          {/* <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
          /> */}

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={event => setPassword(event.target.value)}
            type="password"
            value={password}
            placeholder="New password"
            variant="outlined"
          />

          {/* // Old input
          <input
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            placeholder="Confirm Password"
          /> */}

          <TextField
            fullWidth
            label="Confirm Password"
            margin="normal"
            name="confirmpassword"
            onChange={event => event => setConfirmPassword(event.target.value)}
            type="confirmpassword"
            value={confirmPassword}
            placeholder="Confirm password"
            variant="outlined"
          />

          {/* <button type="submit">Change password</button> */}

          <Box sx={{ py: 4 }}>
          <Button
            //className={classes.bot}
            color="secondary" variant="h4" style={{ fontFamily: 'cursive', fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0  }}
            // style={{ fontFamily: 'cursive',fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Change password
          </Button>
        </Box>

        </form>
      )}
    </div>
  );
};