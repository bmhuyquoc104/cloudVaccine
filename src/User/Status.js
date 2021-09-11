import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Accounts';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';


// For cards
import { Grid,  Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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

export default function Status() {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then(session => {
        console.log('Session:', session);
        setStatus(true);
      })
  },
  );

  // }, []);

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <div>
      {status ? (
        <Grid container spacing={6} style={{ paddingTop: "20px", height: "100vh"}} className={classes.root} alignContent="center">
        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Grid container justifyContent="center" alignContent="center" spacing={spacing}>
            <Grid item>
              <Typography variant="h1" className={classes.header} align="center">COVITRACK</Typography>
              <Divider variant="middle" classes={{root: classes.divider}}/>

              <Typography variant="h4" className={classes.header} align="center">
              You are logged in
              </Typography>
              <Divider variant="middle" classes={{root: classes.divider}}/>
            </Grid>
          </Grid>
            <Button
              style={{ border: 0, fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)' }}
              size="lg"
              onClick={logout}
            >
              Log Out
            </Button>
        </Grid>
      </Grid>
      ) : (
        <Grid container spacing={6} style={{ paddingTop: "20px", height: "100vh"}} className={classes.root} alignContent="center">
          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid container justifyContent="center" alignContent="center" spacing={spacing}>
              <Grid item>
                <Typography variant="h1" className={classes.header} align="center">COVITRACK</Typography>
                <Divider variant="middle" classes={{root: classes.divider}}/>

                <Typography variant="h4" className={classes.header} align="center">
                Please log in to continue
                </Typography>
                <Divider variant="middle" classes={{root: classes.divider}}/>
              </Grid>
            </Grid>
            <Link to="/login">
              <Button
                style={{ border: 0, fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)' }}
                size="lg"
              >
                Log In
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </div>
  );
};