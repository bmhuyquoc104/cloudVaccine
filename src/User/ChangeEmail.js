import React, { useState, useContext } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { CognitoUser } from "amazon-cognito-identity-js";
import { AccountContext } from "./Accounts";
import Pool from "../UserPool";

// Modals
import Form from 'react-bootstrap/Form';

import {
  Box,
  Button,
} from '@material-ui/core';

export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState(1);
  const [code, setCode] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const getUser = () => {
    return new CognitoUser({
      Username: newEmail.toLowerCase(),
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
      }
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        const attributes = [
          new CognitoUserAttribute({ Name: "email", Value: newEmail })
        ];
        user.updateAttributes(attributes, (results, err) => {
          alert("You have successfully change email", results);
        });
        setStage(2);
      })
        .catch(err => {
          alert("Your username or password invalid.",err);
        });
    });
  };

  return (
    <div>
      {stage === 1 &&(
          <Form noValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{color: '#FE6B8B', fontWeight: 'bold' }}>
              <Form.Label>New Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="username@gmail.com"
                required
                onChange={event => setNewEmail(event.target.value)}
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
                onChange={event => setPassword(event.target.value)}
                value={password}
              />
              <Form.Control.Feedback type="invalid">
                Wrong password.
              </Form.Control.Feedback>
            </Form.Group>
            <Box sx={{ py: 2 }} justifyContent="center">
              <Button
                //className={classes.bot}
                color="secondary"
                style={{letterSpacing:"4px",fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)', border: 0, width:"20vw"}}
                // style={{ fontFamily: 'cursive',fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
                align="center"
                type="submit"
                size = "medium"
                variant="contained"
                onClick={onSubmit}
              >
                Send Verification Code
              </Button>
            </Box>
          </Form>
          
      )}
      {stage === 2 && (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{color: '#FE6B8B', fontWeight: 'bold' }}>
              <Form.Label>Verify code</Form.Label>
              <Form.Control
                name="code"
                type="tesxt"
                placeholder="verfication code"
                required
                onChange={event => setCode(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid code.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Box sx={{ py: 2 }} justifyContent="center">
              <Button
                //className={classes.bot}
                color="secondary"
                style={{letterSpacing:"4px",fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)', border: 0, width:"20vw"}}
                // style={{ fontFamily: 'cursive',fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
                align="center"
                type="submit"
                size = "medium"
                variant="contained"
                onClick={sendCode}
              >
                Change Email
              </Button>
            </Box>
        </Form>
      )}
    </div>
  );
};
