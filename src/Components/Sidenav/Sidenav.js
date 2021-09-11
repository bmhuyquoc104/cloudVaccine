import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Typography,
    Box,
    Avatar
} from "@material-ui/core";

import {
    Lock as LockIcon,
    UserPlus as UserPlusIcon,
  } from 'react-feather';

import {makeStyles} from "@material-ui/core/styles";
import { Link as RouterLink} from 'react-router-dom';

// import Amplify, { API, graphqlOperation } from 'aws-amplify';
// import awsconfig from '../../aws-exports';
// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';


// Icons
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import ComputerIcon from '@material-ui/icons/Computer';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MessageIcon from '@material-ui/icons/Message';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PublicIcon from '@material-ui/icons/Public';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';


// Pages
import Account from '../../Pages/Account';
import Review from "../../Pages/Review";
import Register from "../../Pages/Registration";
import Country from "../../Pages/CountriesSummary";
import Vaccine from "../../Pages/Vaccine";
import Dashboard from "../../Pages/Dashboard";
import Home from "../../Pages/Home";
import Signin from "../../Pages/Login";
import Signup from "../../Pages/Signup";
import SettingAccounts from '../../Pages/SettingAccounts';
import ForgotPassword from "../../User/ForgotPassword"

import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';

// Amplify.configure(awsconfig);

const useStyles = makeStyles ((theme) => ({
    drawerPaper:
    {
        width: 'inherit',
        background: 'linear-gradient(45deg, #a4508b 20%, #3a1c71  90%)',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: "#FE9B4B",
            fontWeight: 'bold',
            shadowColor:"1px 10px #FE9B4B"
        },
    },
    header:
    {
        color: '#ee9ca7',
        fontWeight: 'bold',
        fontSize: '4vh',
    },
    icon:
    {
        color: 'white', 
    }
}));

const user = {
    avatar: 'https://i.imgur.com/ToDMYPT.png',
};

function Sidenav() {
    const classes = useStyles();
    return (
        <Router>
            <div style={{display: 'flex'}}>
                <Drawer
                    style={{width: '240px'}}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    classes={{paper: classes.drawerPaper}}
                >
                    
                    <List>
                    <Typography className={classes.header} align="center">
                        <TrackChangesIcon className={classes.header}/>
                        COVITRACK
                    </Typography>
                    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2}} >
                            <Avatar component={RouterLink} src={user.avatar} sx={{ cursor: 'pointer', width: 64, height: 64}}to="/app/account"/>
                            <Typography color="textPrimary" variant="h5"> {user.name}</Typography>
                            <Typography color="textSecondary" variant="body2">{user.jobTitle}</Typography>
                    </Box>

                    <Link to="/account" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PeopleIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={"Account"}/>
                            </ListItem>
                        </Link>
                        <Link to="/home" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary={"Home"}/>
                            </ListItem>
                        </Link>
                        <Link to="/dashboard" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ComputerIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"}/>
                            </ListItem>
                        </Link>
                        
                        <Link to="/register" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ListAltIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={"Register vaccine"}/>
                            </ListItem>
                        </Link>
                        
                        <Link to="/review" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <MessageIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={"Review"}/>
                            </ListItem>
                        </Link>
                        <Link to="/vaccine" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <LocalHospitalIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={"Vaccine"}/>
                            </ListItem>
                        </Link>
                        <Link to="/country" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PublicIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={"Countries summary"}/>
                            </ListItem>
                        </Link>
                    </List>
                    {/* <Link to="/settings" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary={"SettingAccounts"}/>
                            </ListItem>
                        </Link> */}
                        <Link to="/login" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <LockIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={"Login"}/>
                            </ListItem>
                        </Link>
                        <Link to="/signup" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <UserPlusIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary={"Signup"}/>
                            </ListItem>
                        </Link>
                    {/* <AmplifySignOut /> */}
      
                </Drawer>
                
                <Switch>
                    <Route path="/account">
                        <Container>
                            <Account />
                        </Container>
                    </Route>
                    <Route path="/register">
                        <Container>
                            <Register />
                        </Container>
                    </Route>
                    <Route path="/review">
                        <Container>
                            <Review />
                        </Container>
                    </Route>
                    <Route path="/vaccine">
                        <Container>
                            <Vaccine />
                        </Container>
                    </Route>
                    <Route path="/country">
                        <Container>
                            <Country />
                        </Container>
                    </Route>
                    <Route path="/dashboard">
                        <Container>
                            <Dashboard />
                        </Container>
                    </Route>
                    <Route path="/settings">
                        <Container>
                            <SettingAccounts />
                        </Container>
                    </Route>
                    <Route path="/home">
                        <Container>
                            <Home />
                        </Container>
                    </Route>
                    <Route path="/login">
                        <Container>
                            <Signin />
                        </Container>
                    </Route>
                    <Route path="/signup">
                        <Container>
                            <Signup />
                        </Container>
                    </Route>
                    <Route path="/forgotpassword">
                        <Container>
                            <ForgotPassword />
                        </Container>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default Sidenav;