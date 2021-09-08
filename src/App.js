import './App.css';

import Layout from './Components/Layout/Layout';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(45deg, #380036 30%, #21CBF3 90%)',
    width:'100vw',
    height: '100%',
    display: 'flex',
    fontFamily: 'Roboto'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div style={{background: 'linear-gradient(45deg, #380036 30%, #21CBF3 90%)', width:'100%', paddingBottom: '7.5vh'}}>
      <Layout />
    </div>
  );
}

export default App;