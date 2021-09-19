import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import Form from 'react-bootstrap/Form';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Grid,
  Typography
} from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  divider:
  {
    background: "white",
    margin: "3vh"
  },
  text:
  {
    color: 'white',
    marginTop: "10px",
  },
  header:
  {
    color: 'white',
    fontWeight: 'bold',
  },
}));

export default function ForgotPassword() {
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <div>
      {stage === 1 && (
        <Grid container spacing={6} style={{ paddingTop: "20px", height: "100vh"}} className={classes.root} alignContent="center">
          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid container justifyContent="center" alignContent="center" spacing={spacing}>
              <Grid item>
                <Typography variant="h1" className={classes.header} align="center">COVITRACK</Typography>
                <Divider variant="middle" classes={{root: classes.divider}}/>

                <Typography className={classes.text} align="center">
                <b>Forgot your password?</b>
                </Typography>
                <Typography className={classes.text} align="center">
                Enter the email address associated with your account and we’ll send you a link to reset your password
                </Typography>
                <Divider variant="middle" classes={{root: classes.divider}}/>
                <Form onSubmit={sendCode}>
                  <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  style={{color: 'white', fontWeight: 'bold', width: '100vh', margin: "auto"}}
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="username@gmail.com"
                      required
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                      pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                    </Form.Text>
                  </Form.Group>
                  <Box sx={{ py: 2 }} align="center">
                    <Button
                      className={classes.bot}
                      color="secondary" style={{fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)', border: 0 }}
                      // style={{ fontFamily: 'cursive', fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
                      size="medium"
                      endIcon={<SendIcon />}
                      type="submit"
                      variant="contained"
                    >
                      Send verification code
                    </Button>
                  </Box>
              </Form>
              </Grid>
              </Grid>
          </Grid>
        </Grid>
      )}

      {stage === 2 && (
        <Grid container spacing={6} style={{ paddingTop: "20px", height: "100vh"}} className={classes.root} alignContent="center">
        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Grid container justifyContent="center" alignContent="center" spacing={spacing}>
            <Grid item>
              <Typography variant="h1" className={classes.header} align="center">COVITRACK</Typography>
              <Divider variant="middle" classes={{root: classes.divider}}/>

              <Typography className={classes.text} align="center">
              <b>Create a new password</b>
              </Typography>
              <Typography className={classes.text} align="center">
              Enter the fields below to reset your password
              </Typography>
              <Divider variant="middle" classes={{root: classes.divider}}/>
              <Form onSubmit={resetPassword}>
                {/* Code */}
                <Form.Group
                className="mb-3"
                // controlId="formBasicEmail"
                style={{color: 'white', fontWeight: 'bold', width: '100vh', margin: "auto"}}
                >
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    name="code"
                    type="text"
                    placeholder="Verification code"
                    required
                    value={code} 
                    onChange={event => setCode(event.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Code not valid.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>

                {/* Password */}
                <Form.Group
                className="mb-3"
                // controlId="formBasicEmail"
                style={{color: 'white', fontWeight: 'bold', width: '100vh', margin: "auto"}}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="New password"
                    required
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>

                {/* Confirm password */}
                <Form.Group
                className="mb-3"
                // controlId="formBasicEmail"
                style={{color: 'white', fontWeight: 'bold', width: '100vh', margin: "auto"}}
                >
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm new password"
                    required
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Passwords don't match.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Box sx={{ py: 2 }} align="center">
                  <Button
                    className={classes.bot}
                    color="secondary" style={{fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)', border: 0 }}
                    // style={{ fontFamily: 'cursive', fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
                    size="medium"
                    endIcon={<SendIcon />}
                    type="submit"
                    variant="contained"
                  >
                    Change Password
                  </Button>
                </Box>
              </Form>
            </Grid>
            </Grid>
        </Grid>
      </Grid>
      )}
    </div>
  );
}