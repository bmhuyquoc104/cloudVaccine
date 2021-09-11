import React from "react";
// import Amplify from "aws-amplify";
import SignUp from "../User/Signup";
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActionArea
} from '@material-ui/core';

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
    color: theme.palette.background.default,
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

const App = () => {


  return (
    <div>
      <SignUp />                                  
    </div>
  );
};
export default App;