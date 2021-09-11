import React, { useState, useContext } from 'react';
import { AccountContext } from './Accounts';

// Modals
import Form from 'react-bootstrap/Form';

import {
  Box,
  Button,
} from '@material-ui/core';




export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);


  const onSubmit = event => {
    event.preventDefault();

    authenticate(email, password)
      .then(data => {
        console.log('Logged in!', data);
      })
      .catch(err => {
        console.error('Failed to login!', err);
      })
  };


  return (
    <div>
      {/* <form onSubmit={onSubmit}> */}
        {/* <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Email"
        /> */}
        {/* <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          name="email"
          onChange={event => setEmail(event.target.value)}
          type="email"
          placeholder='tiemchungcovid19@gmail.com'
          value={email}
          variant="outlined"
        /> */}
        {/* Old password field */}
        {/* <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Password"
        /> */}
        {/* <TextField
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          onChange={event => setPassword(event.target.value)}
          type="password"
          value={password}
          placeholder="•••••••"
          variant="outlined"
        /> */}
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
                onChange={event => setPassword(event.target.value)}
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
            onClick={onSubmit}
          >
            Log In
          </Button>
        </Box>
        
      {/* </form> */}
    </div>
  );
};