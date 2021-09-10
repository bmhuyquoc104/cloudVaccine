import './App.css';
import Layout from './Components/Layout/Layout';
import KommunicateChat from './Bot';

function App() {
  return (
    <div style={{background: 'linear-gradient(45deg,#b06ab3 30%, #4568dc 90%)', width:'100%',paddingBottom: "7.5vh"}}>
      <Layout />
      <KommunicateChat></KommunicateChat>
    </div>
  );
}

export default App;