import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

// For cards
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import {
  CardMedia
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
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
  divider:
  {
    background: "white",
    margin: "3vh"
  }
}));

export default function Home() {

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <Grid container spacing={6} style={{ paddingTop: "20px", height: "100vh" }} className={classes.root} alignContent="center">
      <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container justifyContent="center" alignContent="center" spacing={spacing}>
          <Grid item>
            <Typography variant="h1" className={classes.header} align="center">COVITRACK</Typography>
            <Divider variant="middle" classes={{ root: classes.divider }} />

            <Typography className={classes.text} align="center">
              Sign up for vaccination to keep you and your community safe.
              <br /><br />
              Keep track of current pandemic situation.
              <br /><br />
              Read public reviews and comments on availble vaccines and much more.
            </Typography>
            <Divider variant="middle" classes={{ root: classes.divider }} />

            <Typography variant="h4" className={classes.header} align="center">
              Keep up to date with everything covid related
            </Typography>
            <Divider variant="middle" classes={{ root: classes.divider }} />
          </Grid>
        </Grid>
        <Link to="/dashboard">
          <Button
            style={{ border: 0, fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)' }}
            size="lg"
          >
            Get Started
          </Button>

          <CardMedia
            className={classes.media}
            image={"https://i.imgur.com/RAwlbVK.png"}
            style={{ width: "40vw", height: "30vh", position: "absolute", top: "3vh", left: "10vw" }}
            alt="..."
          />

          <CardMedia
            className={classes.media}
            image={"https://i.imgur.com/DnwwHDt.png"}
            style={{ width: "25vw", height: "25vh", position: "absolute", top: "75vh", left: "15vw" }}
            alt="..."
          />
        </Link>
      </Grid>
    </Grid>
  );
}