import './App.css';
import Sidenav from './Components/Sidenav/Sidenav'
import KommunicateChat from './Bot';

function App() {
  return (
    <div style={{background: 'linear-gradient(45deg,#b06ab3 30%, #3a1c71 90%)', width:'100%',paddingBottom: "7.5vh"}}>
      <Sidenav />
      <KommunicateChat></KommunicateChat>
    </div>
  );
}

export default App;