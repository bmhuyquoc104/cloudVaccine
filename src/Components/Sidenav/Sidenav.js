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
    Avatar,
    Button
} from "@material-ui/core";

import {
    Lock as LockIcon,
    UserPlus as UserPlusIcon,
  } from 'react-feather';

import {makeStyles} from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from 'react-router-dom';

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
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';


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

import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';

// Amplify.configure(awsconfig);

const useStyles = makeStyles ((theme) => ({
    drawerPaper: {width: 'inherit'},
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
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
                    <Typography></Typography>
                    <List>
                    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2}} >
                            <Avatar component={RouterLink} src={user.avatar} sx={{ cursor: 'pointer', width: 64, height: 64}}to="/app/account"/>
                            <Typography color="textPrimary" variant="h5"> {user.name}</Typography>
                            <Typography color="textSecondary" variant="body2">{user.jobTitle}</Typography>
                    </Box>
                    <Link to="/account" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Account"}/>
                            </ListItem>
                        </Link>
                        <Link to="/home" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Home"}/>
                            </ListItem>
                        </Link>
                        <Link to="/dashboard" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ComputerIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"}/>
                            </ListItem>
                        </Link>
                        
                        <Link to="/register" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ListAltIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Register vaccine"}/>
                            </ListItem>
                        </Link>
                        
                        <Link to="/review" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <MessageIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Review"}/>
                            </ListItem>
                        </Link>
                        <Link to="/vaccine" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <LocalHospitalIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Vaccine"}/>
                            </ListItem>
                        </Link>
                        <Link to="/country" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PublicIcon />
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
                                    <LockIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Login"}/>
                            </ListItem>
                        </Link>
                        <Link to="/signup" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <UserPlusIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Signup"}/>
                            </ListItem>
                        </Link>
                    {/* <AmplifySignOut /> */}
                    <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            Support Us
          </Button>
        </Box>
                </Drawer>
                
                <Switch>
                <Route path="/account">
                        <Container>
                            <SettingAccounts />
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
                </Switch>
            </div>
        </Router>
    );
};

export default Sidenav;