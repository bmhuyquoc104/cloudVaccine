import React from "react";
// import Amplify from "aws-amplify";
import SignUp from "../User/Signup";
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Card,
  CardActions,
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
  // useEffect(() => {
  //   Amplify.configure({
  //     Auth: {
  //       region: process.env.REACT_APP_REGION,
  //       userPoolId: process.env.REACT_APP_USER_POOL_ID,
  //       userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  //     },
  //   });
  // });
  const classes = useStyles();


  return (
    <div>
      <Helmet>
        <title>Register Account</title>
      </Helmet>
      <Grid
                container
                spacing={2}
                style={{ paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px" }}
                className={classes.root}
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <Card
                        className={classes.paper}
                        style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
                    >
                        <CardHeader
                            className={classes.bot} title='Sign up' color="secondary" variant="h1" style={{fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0}}
                        />
                        <CardActionArea>
                            <CardContent>

                                    <Box sx={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                                        <Container maxWidth="sm">
                                            <SignUp />
                                            <Typography style={{color:"#FF8C00", fontWeight: 'bold', letterSpacing:"2px"}}>
                                                Already have an account?
                                                {' '}
                                                <div></div>
                                                <Link component={RouterLink} style={{ fontFamily: 'cursive'}} to="/signin" variant="h7" underline="hover">
                                                    Sign in
                                                </Link>
                                            </Typography>                                           
                                        </Container>
                                    </Box>

                            </CardContent>
                        </CardActionArea>
                        {/* <CardActions className={classes.bot}>
                            <Typography variant="body1" className={classes.bot} variant="h7" style={{ marginTop: "15px", paddingLeft: "15px" }}>   </Typography>
                        </CardActions> */}
                    </Card>
                    <br></br>
                </Grid>
            </Grid>
    </div>
  );
};
export default App;