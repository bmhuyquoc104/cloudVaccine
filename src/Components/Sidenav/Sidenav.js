import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

// import Amplify, { API, graphqlOperation } from 'aws-amplify';
// import awsconfig from '../../aws-exports';
// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';


// Icons
import HomeIcon from '@material-ui/icons/Home';
import ComputerIcon from '@material-ui/icons/Computer';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MessageIcon from '@material-ui/icons/Message';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PublicIcon from '@material-ui/icons/Public';

// Pages
import Review from "../../Pages/Review";
import Register from "../../Pages/Registration";
import Country from "../../Pages/CountriesSummary";
import Vaccine from "../../Pages/Vaccine";

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
                        <Link to="/" className={classes.link}>
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
                                <ListItemText primary={"Register"}/>
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
                    {/* <AmplifySignOut /> */}
                </Drawer>
                
                <Switch>
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
                </Switch>
            </div>
        </Router>
    );
};

export default Sidenav;