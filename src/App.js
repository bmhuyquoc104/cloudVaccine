import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from "./Pages/Review";
import Registration from "./Pages/Registration";
import Vaccine from "./Pages/Vaccine";
import Summary from "./Pages/Summary";
import CountriesSummary from './Pages/CountriesSummary';
import Sidenav from "./Components/Sidenav/Sidenav";

import Signup from './User/Signup';
import Login from './User/Login';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(45deg, #380036 30%, #21CBF3 90%)',
    height: '100%',
    display: 'flex',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Sidenav />
      {/* <Router>
        <div>
          <ul>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
            <li>
              <Link to="/review">Review</Link>
            </li>
            <li>
              <Link to="/vaccine">Vaccine</Link>
            </li>
            <li>
              <Link to="/countriesSummary">CountriesSummary</Link>
            </li>
            <li>
              <Link to="/signUp">Sign Up</Link>
            </li>
            <li>
              <Link to="/signIn">Sign In</Link>
            </li>
            <li>
              <Link to="/Summary">Summary</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
            <Route path="/vaccine">
              <Vaccine />
            </Route>
            <Route path="/countriesSummary">
              <CountriesSummary />
            </Route>
            <Route path="/signIn">
              <Login />
            </Route>
            <Route path="/signUp">
              <Signup />
            </Route>
            <Route path="/Summary">
              <Summary />
            </Route>
          </Switch>
        </div>
      </Router> */}
    </Container>
  );
}

export default App;
