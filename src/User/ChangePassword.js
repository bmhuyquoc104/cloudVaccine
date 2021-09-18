import React, { useState, useContext } from "react";
import { AccountContext } from "./Accounts";

// Modals
import Form from 'react-bootstrap/Form';

import {
  Box,
  Button,
} from '@material-ui/core';

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = event => {
    event.preventDefault();

    getSession().then(({ user, email }) => {
      authenticate(email, password).then(() => {
        user.changePassword(password, newPassword, (err, result) => {
          alert("You have successfully changed your password",result);
        });
      });
    });
  };

  return (
    <div>
      <Form noValidate>
            <Form.Group className="mb-3" controlId="formBasicFullName" style={{color: '#FE6B8B', fontWeight: 'bold' }}>
              <Form.Label>Current Password</Form.Label>
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

            <Form.Group className="mb-3" controlId="formBasicFullName" style={{color: '#FE6B8B', fontWeight: 'bold' }}>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                name="newpassword"
                type="password"
                placeholder="password"
                required
                onChange={event => setNewPassword(event.target.value)}
                value={newPassword}
              />
              <Form.Control.Feedback type="invalid">
                New password doesn't match.
              </Form.Control.Feedback>
            </Form.Group>
        </Form>

        {/* // Old button
        <button type='submit'> Sign in now</button> */}
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
            Change Password
          </Button>
        </Box>
    </div>
  );
};
