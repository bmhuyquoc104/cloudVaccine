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
                style={{ paddingTop: "9.75%", paddingBottom: "7%",paddingLeft: "50px", paddingRight: "50px" }}
                className={classes.root}
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <Card
                        className={classes.paper}
                        style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
                    >
                        <CardHeader
                            className={classes.bot}
                            title={
                                <Typography
                                variant="h4"
                                style={{fontWeight: 'bold',     letterSpacing:"2px"}}
                                >
                                    Sign in
                                </Typography>
                            }
                            subtitle={subtitle}
                            color="secondary"
                            style={{fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0}}
                        />
                            <CardContent>
                                <Account>
                                    <Box
                                        style={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}
                                    >
                                        <Container maxWidth="sm">
                                            <Login />
                                            <Typography style={{color:"#FF8C00", fontWeight: 'bold', letterSpacing:"2px"}}>
                                                Don't have an account?
                                            </Typography>
                                            <Typography style={{color:"#7F53AC", letterSpacing:"2px"}}>
                                                <Link component={RouterLink} to="/signup">
                                                    Sign up here
                                                </Link>
                                            </Typography>
                                            {/* <Typography variant="body1">
                                                Forgot your password?                                      
                                            </Typography>
                                            <ForgotPassword /> */}
                                        </Container>
                                    </Box>
                                </Account>
                            </CardContent>
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
