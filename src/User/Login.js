import React, { useState, useContext } from 'react';
import { AccountContext } from './Accounts';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);

  const classes = useStyles();

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
      <form onSubmit={onSubmit}>
        {/* <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Email"
        /> */}
        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          name="email"
          onChange={event => setEmail(event.target.value)}
          type="email"
          placeholder='tiemchungcovid19@gmail.com'
          value={email}
          variant="outlined"
        />
        {/* Old password field */}
        {/* <input
          type="password"
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
          placeholder="•••••••"
          variant="outlined"
        />

        {/* // Old button
        <button type='submit'> Sign in now</button> */}
        <Box sx={{ py: 2 }}>
          <Button
            //className={classes.bot}
            color="secondary" variant="h4" style={{ fontFamily: 'cursive', fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0  }}
            // style={{ fontFamily: 'cursive',fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Sign in now
          </Button>
        </Box>
        
      </form>
    </div>
  );
};