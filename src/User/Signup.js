import React, { useState } from "react";
import image from '../Images/cases.jpg';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import { Auth } from "aws-amplify";


import {
  Box,
  Button,
  TextField,
  Typography

} from '@material-ui/core';

import {
  Container,
  Grid,
  Link,
  Card,
  CardContent,
  CardHeader,
  CardMedia
} from '@material-ui/core';


import Form from 'react-bootstrap/Form';

const useStyles = makeStyles((theme) => ({
  control: {
      padding: theme.spacing(2),
  },
  button: {
      margin: theme.spacing(1),
  },
  bot:
  {
      color: 'white',
      border: 0,
      borderRadius: 2,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      padding:"25px"
  },
  pager: {
      background:"#fde7f9",
  },
  icon:
  {
      color: theme.palette.background.default,
  },
  info:
  {
      marginTop: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
  }
}));

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");
  const classes = useStyles();
  const signUp = (e) => {
    e.preventDefault();
    Auth.signUp({ username: email, password, attributes: { email } })
      .then((data) => {
        console.log(data);
        setWaitingForCode(true);
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const confirmSignUp = (e) => {
    e.preventDefault();
    Auth.confirmSignUp(email, code)
      .then((data) => {
        console.log(data);
        setWaitingForCode(false);
        setEmail("");
        setCode("");
      })
      .catch((err) => console.log(err));
  };
  const resendCode = () => {
    Auth.resendSignUp(email)
      .then(() => {
        console.log("code resent successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checked = React.useState(true);
  return (
    <div className="form">
            <Typography
                variant="h3"
                style={{fontWeight: 'bold', letterSpacing:"2px", color: "white", marginTop: "10vh", marginBottom: "-15vh"}}
                align="center"
            >
                Please Sign Up And Explore Our Services <span style={{color: '#B22222'}}>!</span>
            </Typography>
            

      {!waitingForCode && (
          <Grid
                container
                spacing={2}
                style={{ marginTop: "10%", marginBottom: "8%",paddingLeft: "50px", paddingRight: "50px" }}
                className={classes.root}
                justifyContent="center"
            >
              <Grid item xs={4}>
                <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
                    <Card
                        className={classes.paper}
                        style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px",  height: "70vh"}}
                    >
                        <CardContent style={{padding: 0}}>
                            <CardMedia 
                            className={classes.media}
                            image={"https://i.imgur.com/jJgIwfp.jpg"}
                            style={{ width: "24vw", height: "70vh"}}
                            alt="..."
                            />
                        </CardContent>
                    </Card>
                    </Fade>
                </Grid>
                <Grid item xs={4}>
                  <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
                    <Card
                        className={classes.paper}
                        style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", height: "70vh",background:"#fde7f9"}}
                    >
                        <CardHeader
                            className={classes.bot}
                            // title={
                            //     <Typography
                            //     variant="h4"
                            //     style={{fontWeight: 'bold',     letterSpacing:"2px"}}
                            //     align="center"
                            //     >
                            //         Sign in
                            //     </Typography>
                            // }
                            color="secondary"
                            style={{fontWeight: 'bold', marginTop: "0px", paddingLeft: "30px", backgroundImage: 'linear-gradient(45deg, #aa4465 30%,#861657 90%)', border: 0}}
                        />
                            <CardContent>
                            <Form noValidate>
                              <Form.Group className="mb-3" controlId="formBasicEmail" style={{color: '#FE6B8B', fontWeight: 'bold' }}>
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

                              <Form.Group className="mb-3" controlId="formBasicFullName" style={{color: '#FE6B8B', fontWeight: 'bold' }}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                  name="password"
                                  type="password"
                                  placeholder="password"
                                  required
                                  onChange={(e) => setPassword(e.target.value)}
                                  value={password}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Wrong password.
                                </Form.Control.Feedback>
                              </Form.Group>
                          </Form>

                          {/* // Old button
                          <button type='submit'> Sign in now</button> */}
                          <Box sx={{ py: 2 }}>
                            <Button
                              //className={classes.bot}
                              fullWidth
                              color="secondary"
                              style={{maxWidth:"40%", letterSpacing:"4px", backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)', border: 0}}
                              // style={{ fontFamily: 'cursive',fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
                              align="center"
                              type="submit"
                              size = "medium"
                              variant="contained"
                            >
                              Signup
                            </Button>
                          </Box>
                      

                              <Typography style={{color:"#FE6B8B", fontWeight: '600',letterSpacing:"1px",fontSize:"14px"}}>
                                  Already have an account?<br/>
                                  <Link component={RouterLink} style={{color:"#FFA500", fontWeight: '700', letterSpacing:"2px",fontSize:"15px"}} to="/login" variant="h7" underline="hover">
                                      Sign in
                                  </Link>
                              </Typography>                                           
                        </CardContent>
                    </Card>
                  </Fade>
                </Grid>
                
            </Grid>
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
          <button type="submit" onClick={confirmSignUp}>
            Confirm Sign Up
          </button>
          {/* <button type="button" onClick={resendCode}> */}
          <button type="button" onClick={resendCode}>
            Resend code
          </button>
        </form>
      )}
    </div>
  );
};
export default SignUp;