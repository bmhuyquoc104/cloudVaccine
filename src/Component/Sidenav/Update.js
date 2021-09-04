import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
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
import Register from "../../Pages/Register";
import Country from "../../Pages/Country";
import Vaccine from "../../Pages/Vaccine";

import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';

// Amplify.configure(awsconfig);

const useStyles = makeStyles ((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    drawerPaper: {width: 'inherit'},
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}));


function Sidenav() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
        <Router>
            <div style={{display: 'flex'}}>
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

        </div>
      );
    return (
        <div>
        {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
            style={{width: '240px'}}
            variant="persistent"
            classes={{paper: classes.drawerPaper}}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
            </React.Fragment>
        ))}
        </div>            
    );
};

export default Sidenav;