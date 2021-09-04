import Sidenav from "../Sidenav/Sidenav"
import Navbar from "../Navbar/Navbar"
import Footer from '../Footer/Footer';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Router>
        <Navbar />
        <Sidenav />
        <Footer />
      </Router>
    </div>
  );
}
 
export default Layout;