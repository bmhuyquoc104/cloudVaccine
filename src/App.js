import './App.css';
import Sidenav from './Component/Sidenav/Sidenav';
import Navbar from './Component/Navbar/Navbar';
import Layout from './Component/Layout/Layout';
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles ({
  container: {
      display: 'flex'
  }
});

function App() {
  const classes = useStyles();
  return (
      <div className={classes.container}>
          <Layout />
          {/* <Sidenav /> */}
      </div>
  );
}

// export default withAuthenticator(App);
export default App;
