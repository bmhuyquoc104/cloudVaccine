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
import { Account } from './Pages/Accounts';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Status from './Pages/Status';
import Settings from './Pages/Setting';
function App() {
  return (
    <div className="App">
      <Router>
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
  );
}

export default App;
