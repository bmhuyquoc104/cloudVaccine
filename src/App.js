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
import CountriesSummary from './Pages/CountriesSummary';
<<<<<<< Updated upstream
import { Account } from './User/Accounts';
import Signup from './User/Signup';
import Login from './Pages/Login';
import Status from './User/Status';
import Settings from './User/Setting';
=======
import Sidenav from "./Components/Sidenav/Sidenav";

import Home from "./Pages/Home";

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

>>>>>>> Stashed changes
function App() {
  return (
<<<<<<< Updated upstream
    <div className="App">
      <Router>
        <div>
=======
    <Container className={classes.root}>
      <Sidenav />
      <Router>
        {/* <div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
            </li> */}
            <li>
              <Link to="/Home">Home</Link>
            </li>
            {/* <li>
              <Link to="/Summary">Summary</Link>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            </Route>
          </Switch>
          <Account>
            <Status/>
            <Signup/>
            <Login/>
            <Settings/>
          </Account>
        </div>
      </Router>
    </div>
=======
            </Route> */}
            <Route path="/Home">
              <Home />
            </Route>
            {/* {/* <Route path="/Summary">
              <Summary />
            </Route>
          </Switch>
        </div> */}
      </Router>
    </Container>
>>>>>>> Stashed changes
  );
}

export default App;
