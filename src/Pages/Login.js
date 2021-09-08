import React from "react";
import { Account } from "../User/Accounts";
import Login from "../User/Login";
import ForgotPassword from "../User/ForgotPassword";

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

import SendIcon from '@material-ui/icons/Send';

// export default () => {
//     // const navigate = useNavigate();

//     return (
//         <div>
//         <Helmet>
//             <title>Login into dashboard</title>
//         </Helmet>
//         <Account>
//             <Box sx={{backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'}}>
//                 <Container maxWidth="sm">
//                     <Login />
//                     <ForgotPassword />
//                 </Container>
//             </Box>
//         </Account>
//         </div>
//     );
// };

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

const subtitle = (
    <li>Sign in test</li>
);

const UserLogin = () => {

    const classes = useStyles();
    return (
        <>
            <Helmet>
                <title>Login in the Dashboard</title>
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
                            className={classes.bot} title='Sign in with email address' subtitle={subtitle} color="secondary" variant="h4" style={{ fontFamily: 'cursive', fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0  }}
                        />
                        <CardActionArea>
                            <CardContent>
                                <Account>
                                    <Box sx={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                                        <Container maxWidth="sm">
                                            <Login />
                                            <Typography variant="body1" style={{ fontFamily: 'cursive'}}>
                                                Don&apos;t have an account?
                                                {' '}
                                                <Link component={RouterLink} style={{ fontFamily: 'cursive'}} to="/signup" variant="h7" underline="hover">
                                                    Sign up
                                                </Link>
                                            </Typography>
                                            <Typography variant="body1">
                                                Forgot your password?                                      
                                            </Typography>
                                            <ForgotPassword />
                                        </Container>
                                    </Box>
                                </Account>
                            </CardContent>
                        </CardActionArea>
                        {/* <CardActions className={classes.bot}>
                            <Typography variant="body1" className={classes.bot} variant="h7" style={{ marginTop: "15px", paddingLeft: "15px" }}>   </Typography>
                        </CardActions> */}
                    </Card>
                    <br></br>
                </Grid>
            </Grid>

        </>
    );
};

export default UserLogin;
