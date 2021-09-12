import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import Form from 'react-bootstrap/Form';
import Divider from '@material-ui/core/Divider';

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
      alert("Your password and confirmPassword is not matched");
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: data => {
        console.log("onSuccess:", data);
        alert("You have successfully reset your password")
      },
      onFailure: err => {
        alert("Your code is invalid, please enter again or request new code:", err);
      }
    });
  };
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <div>
      {stage === 1 && (
        // <form onSubmit={sendCode}>

          // Old input form
          // <input
          //   value={email}
          //   onChange={event => setEmail(event.target.value)}
          //   placeholder="Your current email"
          // />
          // <TextField
          //   fullWidth
          //   label="Enter your registered email"
          //   margin="normal"
          //   name="email"
          //   onChange={event => setEmail(event.target.value)}
          //   type="email"
          //   value={email}
          //   variant="outlined"
          //   style={{ fontFamily: 'cursive', fontWeight: 'bold' }}
          // />
          //Old button
          //* <button type="submit">Send verification code</button>


        //   <Box sx={{ py: 2 }}>
        //     <Button
        //       //className={classes.bot}
        //       color="secondary" style={{ fontFamily: 'cursive', fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
        //       // style={{ fontFamily: 'cursive', fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
        //       size="medium"
        //       endIcon={<SendIcon />}
        //       type="submit"
        //       variant="contained"
        //     >
        //       Send verification code
        //     </Button>
        //   </Box>
        // </form>

        
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
                      onChange={event => setEmail(event.target.value)}
                      value={email}
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
        // <form onSubmit={resetPassword}>

        //   <TextField
        //     fullWidth
        //     label="Code"
        //     margin="normal"
        //     name="code"
        //     onChange={event => setCode(event.target.value)}
        //     type="code"
        //     value={code}
        //     placeholder="Verification code"
        //     variant="outlined"
        //   />

        //   <TextField
        //     fullWidth
        //     label="Password"
        //     margin="normal"
        //     name="password"
        //     onChange={event => setPassword(event.target.value)}
        //     type="password"
        //     value={password}
        //     placeholder="New password"
        //     variant="outlined"
        //   />

        //   <TextField
        //     fullWidth
        //     label="Confirm Password"
        //     margin="normal"
        //     name="confirmpassword"
        //     onChange={event => event => setConfirmPassword(event.target.value)}
        //     type="confirmpassword"
        //     value={confirmPassword}
        //     placeholder="Confirm password"
        //     variant="outlined"
        //   />

        //   <Box sx={{ py: 4 }}>
        //   <Button
        //     color="secondary"
        //     style={{ fontFamily: 'cursive', fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0  }}
        //     fullWidth
        //     size="large"
        //     type="submit"
        //     variant="contained"
        //   >
        //     Change password
        //   </Button>
        // </Box>
        // </form>

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
                    onChange={event => setCode(event.target.value)}
                    value={code}
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
                    onChange={event => setPassword(event.target.value)}
                    value={password}
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
                    onChange={event => setConfirmPassword(event.target.value)}
                    value={confirmPassword}
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
                    Change password
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