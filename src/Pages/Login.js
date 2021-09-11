import React from "react";
import { Account } from "../User/Accounts";
import Login from "../User/Login";
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import image from '../Images/cases.jpg';

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
    CardActionArea,
    CardMedia
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
        color: 'white',
        background:  'linear-gradient(45deg, #aa4465 30%,#861657 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    pager: {
        background:"#fde7f9",
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
            <Typography
                variant="h3"
                style={{fontWeight: 'bold', letterSpacing:"2px", color: "white", marginTop: "10vh", marginBottom: "-15vh"}}
                align="center"
            >
                Sign In And Enjoy Our Services
            </Typography>
            <Helmet>
                <title>Login in the Dashboard</title>
            </Helmet>
            <Grid
                container
                spacing={2}
                style={{ marginTop: "15%", marginBottom: "8%",paddingLeft: "50px", paddingRight: "50px" }}
                className={classes.root}
                justifyContent="center"
            >
                <Grid item xs={6}>
                    <Card
                        className={classes.paper}
                        style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", height: "65vh",background:"#fde7f9"}}
                    >
                        <CardHeader
                            className={classes.bot}
                            // title={
                            //     <Typography
                            //     variant="h4"
                            //     style={{fontWeight: 'bold',     letterSpacing:"2px"}}
                            //     align="center"
                            //     >
                            //         Sign in
                            //     </Typography>
                            // }
                            subtitle={subtitle}
                            color="secondary"
                            style={{fontWeight: 'bold', marginTop: "0px", paddingLeft: "15px", backgroundImage: 'linear-gradient(45deg, #aa4465 30%,#861657 90%)', border: 0}}
                        />
                            <CardContent>
                                <Account>
                                    <Box
                                        style={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}
                                    >
                                        <Container maxWidth="sm">
                                            <Login />
                                            <Typography style={{color:"#FE6B8B", fontWeight: '600',letterSpacing:"1px",fontSize:"13px"}}>
                                                Don't Have An Account Yet?
                                                <Link style={{color:"#FFA500", fontWeight: 'bold', letterSpacing:"3px",fontSize:"14px",marginLeft: "7px"}} component={RouterLink} to="/signup">
                                                    Sign up here!
                                                </Link>
                                            </Typography>
                                            <Typography style={{color:"#FE6B8B", fontWeight: '600', letterSpacing:"1px",fontSize:"13px"}}>
                                                Forgot Your Password?
                                                <Link style={{color:"	#FFA500", fontWeight: '700',fontSize:"14px",letterSpacing:"3px",marginLeft: "7px"}} component={RouterLink} to="/forgotpassword">
                                                    Recover password
                                                </Link>
                                            </Typography>
                                        </Container>
                                    </Box>
                                </Account>
                            </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card
                        className={classes.paper}
                        style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px",  height: "65vh"}}
                    >
                        <CardContent style={{padding: 0}}>
                            <CardMedia 
                            className={classes.media}
                            image={image}
                            style={{ width: "40vw", height: "65vh"}}
                            alt="..."
                            />
                        </CardContent>
                    </Card>
                    <br></br>
                </Grid>
            </Grid>

        </>
    );
};

export default UserLogin;
