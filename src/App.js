import './App.css';


import Sidenav from "./Components/Sidenav/Sidenav";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(45deg, #380036 30%, #21CBF3 90%)',
    height: '100%',
    display: 'flex',
    fontFamily: 'Roboto'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Sidenav />
    </Container>
  );
}

export default App;
