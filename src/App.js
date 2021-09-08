import './App.css';
import Layout from './Components/Layout/Layout';


function App() {
  return (
    <div style={{background: 'linear-gradient(45deg, #380036 30%, #21CBF3 90%)', width:'100%'}}>
      <Layout />
      <KommunicateChat></KommunicateChat>
    </div>
  );
}

export default App;